import React from 'react'
import { TaskStatus, TaskPriority, TaskFilters as ITaskFilters, TaskSort, User, Project } from '../types'

interface TaskFiltersProps {
  filters: ITaskFilters
  sort: TaskSort
  users: User[]
  projects: Project[]
  onFiltersChange: (filters: ITaskFilters) => void
  onSortChange: (sort: TaskSort) => void
}

const statusLabels = {
  [TaskStatus.TODO]: '待办',
  [TaskStatus.IN_PROGRESS]: '进行中',
  [TaskStatus.IN_REVIEW]: '审核中',
  [TaskStatus.COMPLETED]: '已完成'
}

const priorityLabels = {
  [TaskPriority.LOW]: '低',
  [TaskPriority.MEDIUM]: '中',
  [TaskPriority.HIGH]: '高',
  [TaskPriority.URGENT]: '紧急'
}

function TaskFiltersComponent({ filters, sort, users, projects, onFiltersChange, onSortChange }: TaskFiltersProps) {
  const handleFilterChange = (key: keyof ITaskFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined
    })
  }

  const handleSortChange = (field: string, direction: string) => {
    onSortChange({
      field: field as any,
      direction: direction as 'ASC' | 'DESC'
    })
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4">筛选和排序</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            状态
          </label>
          <select
            value={filters.status || ''}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">全部状态</option>
            {Object.values(TaskStatus).map(status => (
              <option key={status} value={status}>
                {statusLabels[status]}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            优先级
          </label>
          <select
            value={filters.priority || ''}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">全部优先级</option>
            {Object.values(TaskPriority).map(priority => (
              <option key={priority} value={priority}>
                {priorityLabels[priority]}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            分配给
          </label>
          <select
            value={filters.assigneeId || ''}
            onChange={(e) => handleFilterChange('assigneeId', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">全部用户</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            项目
          </label>
          <select
            value={filters.projectId || ''}
            onChange={(e) => handleFilterChange('projectId', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">全部项目</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            排序字段
          </label>
          <select
            value={sort.field}
            onChange={(e) => handleSortChange(e.target.value, sort.direction)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="createdAt">创建时间</option>
            <option value="updatedAt">更新时间</option>
            <option value="priority">优先级</option>
            <option value="title">标题</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            排序方向
          </label>
          <select
            value={sort.direction}
            onChange={(e) => handleSortChange(sort.field, e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="DESC">降序</option>
            <option value="ASC">升序</option>
          </select>
        </div>
        
        <div className="flex items-end">
          <button
            onClick={() => {
              onFiltersChange({})
              onSortChange({ field: 'createdAt', direction: 'DESC' })
            }}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            重置
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskFiltersComponent
