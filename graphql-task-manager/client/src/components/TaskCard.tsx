import React from 'react'
import { Task, TaskStatus, TaskPriority } from '../types'

interface TaskCardProps {
  task: Task
  onStatusChange: (taskId: string, status: TaskStatus) => void
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
}

const priorityColors = {
  [TaskPriority.LOW]: 'border-green-400 bg-green-50',
  [TaskPriority.MEDIUM]: 'border-yellow-400 bg-yellow-50',
  [TaskPriority.HIGH]: 'border-orange-400 bg-orange-50',
  [TaskPriority.URGENT]: 'border-red-400 bg-red-50'
}

const statusColors = {
  [TaskStatus.TODO]: 'bg-gray-100 text-gray-800',
  [TaskStatus.IN_PROGRESS]: 'bg-blue-100 text-blue-800',
  [TaskStatus.IN_REVIEW]: 'bg-purple-100 text-purple-800',
  [TaskStatus.COMPLETED]: 'bg-green-100 text-green-800'
}

const priorityLabels = {
  [TaskPriority.LOW]: '低',
  [TaskPriority.MEDIUM]: '中',
  [TaskPriority.HIGH]: '高',
  [TaskPriority.URGENT]: '紧急'
}

const statusLabels = {
  [TaskStatus.TODO]: '待办',
  [TaskStatus.IN_PROGRESS]: '进行中',
  [TaskStatus.IN_REVIEW]: '审核中',
  [TaskStatus.COMPLETED]: '已完成'
}

function TaskCard({ task, onStatusChange, onEdit, onDelete }: TaskCardProps) {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(task.id, e.target.value as TaskStatus)
  }

  return (
    <div className={`task-card border-l-4 ${priorityColors[task.priority]}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            编辑
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            删除
          </button>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-3">{task.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
          {statusLabels[task.status]}
        </span>
        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
          优先级: {priorityLabels[task.priority]}
        </span>
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div>
          <p>分配给: {task.assignee.name}</p>
          <p>项目: {task.project.title}</p>
        </div>
        <div className="text-right">
          <p>创建: {new Date(task.createdAt).toLocaleDateString()}</p>
          <p>更新: {new Date(task.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>
      
      <div className="mt-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          状态:
        </label>
        <select
          value={task.status}
          onChange={handleStatusChange}
          className="w-full px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.values(TaskStatus).map(status => (
            <option key={status} value={status}>
              {statusLabels[status]}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default TaskCard
