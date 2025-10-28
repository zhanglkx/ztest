import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useSubscription } from '@apollo/client'
import { GET_TASKS, GET_USERS, GET_PROJECTS } from './graphql/queries'
import { 
  CREATE_TASK, 
  UPDATE_TASK, 
  UPDATE_TASK_STATUS, 
  DELETE_TASK 
} from './graphql/mutations'
import { 
  TASK_CREATED_SUBSCRIPTION, 
  TASK_UPDATED_SUBSCRIPTION, 
  TASK_DELETED_SUBSCRIPTION 
} from './graphql/subscriptions'
import TaskCard from './components/TaskCard'
import TaskForm from './components/TaskForm'
import TaskFiltersComponent from './components/TaskFilters'
import { Task, TaskFilters as ITaskFilters, TaskSort, TaskStatus } from './types'

// 定义GraphQL返回的类型
interface TaskEdge {
  node: Task
  cursor: string
}

function App() {
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | undefined>()
  const [filters, setFilters] = useState<ITaskFilters>({})
  const [sort, setSort] = useState<TaskSort>({ field: 'createdAt', direction: 'DESC' })

  // 查询数据
  const { data: tasksData, loading: tasksLoading, error: tasksError, fetchMore, refetch } = useQuery(GET_TASKS, {
    variables: { filters, sort, first: 10 },
    errorPolicy: 'all'
  })

  const { data: usersData } = useQuery(GET_USERS)
  const { data: projectsData } = useQuery(GET_PROJECTS)

  // 变更操作
  const [createTask] = useMutation(CREATE_TASK, {
    refetchQueries: [{ query: GET_TASKS, variables: { filters, sort, first: 10 } }]
  })

  const [updateTask] = useMutation(UPDATE_TASK, {
    refetchQueries: [{ query: GET_TASKS, variables: { filters, sort, first: 10 } }]
  })

  const [updateTaskStatus] = useMutation(UPDATE_TASK_STATUS, {
    refetchQueries: [{ query: GET_TASKS, variables: { filters, sort, first: 10 } }]
  })

  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [{ query: GET_TASKS, variables: { filters, sort, first: 10 } }]
  })

  // 订阅实时更新
  useSubscription(TASK_CREATED_SUBSCRIPTION, {
    onData: ({ data }) => {
      if (data.data?.taskCreated) {
        refetch()
      }
    }
  })

  useSubscription(TASK_UPDATED_SUBSCRIPTION, {
    onData: ({ data }) => {
      if (data.data?.taskUpdated) {
        refetch()
      }
    }
  })

  useSubscription(TASK_DELETED_SUBSCRIPTION, {
    onData: ({ data }) => {
      if (data.data?.taskDeleted) {
        refetch()
      }
    }
  })

  // 当筛选或排序改变时重新查询
  useEffect(() => {
    refetch({ filters, sort, first: 10 })
  }, [filters, sort, refetch])

  const handleCreateTask = async (taskData: {
    title: string
    description: string
    priority: string
    assigneeId: string
    projectId: string
  }) => {
    try {
      await createTask({ variables: { input: taskData } })
      setShowForm(false)
    } catch (error) {
      console.error('创建任务失败:', error)
      alert('创建任务失败，请检查输入数据')
    }
  }

  const handleUpdateTask = async (taskData: {
    title: string
    description: string
    priority: string
    assigneeId: string
    projectId: string
  }) => {
    if (!editingTask) return
    
    try {
      await updateTask({ 
        variables: { 
          id: editingTask.id, 
          input: taskData 
        } 
      })
      setEditingTask(undefined)
      setShowForm(false)
    } catch (error) {
      console.error('更新任务失败:', error)
      alert('更新任务失败，请检查输入数据')
    }
  }

  const handleStatusChange = async (taskId: string, status: TaskStatus) => {
    try {
      await updateTaskStatus({ variables: { id: taskId, status } })
    } catch (error) {
      console.error('更新任务状态失败:', error)
      alert('更新任务状态失败')
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    if (!window.confirm('确定要删除这个任务吗？')) return
    
    try {
      await deleteTask({ variables: { id: taskId } })
    } catch (error) {
      console.error('删除任务失败:', error)
      alert('删除任务失败')
    }
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setShowForm(true)
  }

  const handleLoadMore = () => {
    if (tasksData?.tasks?.pageInfo?.hasNextPage) {
      fetchMore({
        variables: {
          after: tasksData.tasks.pageInfo.endCursor
        }
      })
    }
  }

  if (tasksLoading && !tasksData) return <div className="flex justify-center items-center h-screen">加载中...</div>
  if (tasksError) return <div className="flex justify-center items-center h-screen text-red-600">错误: {tasksError.message}</div>

  const tasks = tasksData?.tasks?.edges?.map((edge: TaskEdge) => edge.node) || []
  const users = usersData?.users || []
  const projects = projectsData?.projects || []

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">GraphQL 任务管理系统</h1>
          <button
            onClick={() => {
              setEditingTask(undefined)
              setShowForm(true)
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            创建任务
          </button>
        </div>

        {/* 筛选和排序 */}
        <TaskFiltersComponent
          filters={filters}
          sort={sort}
          users={users}
          projects={projects}
          onFiltersChange={setFilters}
          onSortChange={setSort}
        />

        {/* 任务统计 */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">任务统计</h3>
            <span className="text-gray-600">
              总计: {tasksData?.tasks?.totalCount || 0} 个任务
            </span>
          </div>
        </div>

        {/* 任务列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task: Task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={handleStatusChange}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>

        {/* 加载更多 */}
        {tasksData?.tasks?.pageInfo?.hasNextPage && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              加载更多
            </button>
          </div>
        )}

        {/* 空状态 */}
        {tasks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-xl mb-4">暂无任务</div>
            <button
              onClick={() => {
                setEditingTask(undefined)
                setShowForm(true)
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              创建第一个任务
            </button>
          </div>
        )}

        {/* 任务表单模态框 */}
        {showForm && (
          <TaskForm
            task={editingTask}
            users={users}
            projects={projects}
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            onCancel={() => {
              setShowForm(false)
              setEditingTask(undefined)
            }}
          />
        )}
      </div>
    </div>
  )
}

export default App
