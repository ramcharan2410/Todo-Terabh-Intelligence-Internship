import React, { useState } from 'react'
import TaskItem from './TaskItem.js'
import NewTaskForm from './NewTaskForm.js'

const TaskList = ({ token, tasks, setTasks }) => {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const countTasksByCategory = (category) => {
    if (category === 'All') {
      return tasks.length
    }
    const filteredTasks = tasks.filter((task) => {
      return task.status === category
    })
    return filteredTasks.length
  }

  const filteredTasks = tasks.filter((task) => {
    if (selectedCategory === 'All') {
      return true
    }
    return task.status === selectedCategory
  })

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
  }

  let taskNumber = 0

  let noTasksMessage = 'No tasks found.'
  if (selectedCategory === 'Pending' && countTasksByCategory('Pending') === 0) {
    noTasksMessage = 'No pending tasks found. You did it! 🎉'
  } else if (
    selectedCategory === 'Completed' &&
    countTasksByCategory('Completed') === 0
  ) {
    noTasksMessage = 'No completed tasks found.'
  }

  return (
    <div className="task-list-container">
      <div className="task-title-container">
        <div className="task-title">Tasks</div>
      </div>
      <div className="quote">Don't give up! 💪</div>
      <div className="status-bar">
        <button
          onClick={() => handleCategoryClick('All')}
          className={selectedCategory === 'All' ? 'all' : ''}
        >
          All: {countTasksByCategory('All')}
        </button>
        <button
          onClick={() => handleCategoryClick('Pending')}
          className={selectedCategory === 'Pending' ? 'pending' : ''}
        >
          Pending: {countTasksByCategory('Pending')}
        </button>
        <button
          onClick={() => handleCategoryClick('Completed')}
          className={selectedCategory === 'Completed' ? 'completed' : ''}
        >
          Completed: {countTasksByCategory('Completed')}
        </button>
      </div>
      <div className="tasks-border-container">
        <div className="tasks-container">
          {filteredTasks.length > 0 ? (
            <div className="tasks">
              {/* If exceeded, they need to be overflow and scrollbar should appear */}
              {filteredTasks.map((task) => {
                taskNumber++
                return (
                  <TaskItem
                    key={task.id}
                    token={token}
                    task={task}
                    tasks={tasks}
                    setTasks={setTasks}
                    taskNumber={taskNumber}
                  />
                )
              })}
            </div>
          ) : (
            <p className="no-tasks-found">{noTasksMessage}</p>
          )}
          <NewTaskForm token={token} tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
    </div>
  )
}

export default TaskList
