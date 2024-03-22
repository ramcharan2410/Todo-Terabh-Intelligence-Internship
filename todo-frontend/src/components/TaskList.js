import React from 'react'
import { useState } from 'react'
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
          {/* flex-direction: column */}
          <div className="tasks">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <TaskItem
                  key={task.id} // Don't forget to add a unique key prop when rendering a list of components
                  token={token}
                  task={task}
                  tasks={tasks}
                  setTasks={setTasks}
                />
              ))
            ) : (
              <p className="no-tasks-found">No tasks found.</p>
            )}
          </div>
          <NewTaskForm />
        </div>
      </div>
    </div>
  )
}

export default TaskList
