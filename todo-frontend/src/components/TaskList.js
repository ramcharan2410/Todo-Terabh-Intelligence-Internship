import React from 'react'
import { useState } from 'react'
import TaskItem from './TaskItem.js'

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
      <div className="tasks-title">Tasks</div>
      {/* Include how many are pending and how many are done, etc! */}
      {/* Include motivational things like, Don't give up! (strength arm emoji!) */}
      <div className="status-bar">
        <button
          onClick={() => handleCategoryClick('All')}
          className={selectedCategory === 'All' ? 'active' : ''}
        >
          All: {countTasksByCategory('All')}
        </button>
        <button
          onClick={() => handleCategoryClick('Pending')}
          className={selectedCategory === 'Pending' ? 'active' : ''}
        >
          Pending: {countTasksByCategory('Pending')}
        </button>
        <button
          onClick={() => handleCategoryClick('Completed')}
          className={selectedCategory === 'Completed' ? 'active' : ''}
        >
          Completed: {countTasksByCategory('Completed')}
        </button>
      </div>
      <div className="tasks">
        {/* flex-direction: column */}
        {filteredTasks.map((task) => {
          return (
            <TaskItem
              token={token}
              task={task}
              tasks={tasks}
              setTasks={setTasks}
            />
          )
        })}
      </div>
    </div>
  )
}

export default TaskList
