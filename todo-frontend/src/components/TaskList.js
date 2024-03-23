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

  let noTasksMessage =
    "No tasks found. 🚀 Let's kick off your journey by adding a new task!"
  if (selectedCategory === 'Pending' && countTasksByCategory('Pending') === 0) {
    noTasksMessage = 'No pending tasks found. You did it! 🎉'
  } else if (
    selectedCategory === 'Completed' &&
    countTasksByCategory('Completed') === 0
  ) {
    noTasksMessage = "No completed tasks found. Don't give up! 💪"
  }

  return (
    <div className="task-list-container">
      <div className="task-title-container">
        <div className="task-title">Tasks</div>
      </div>
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
      <div className="tasks-outer-container">
        <div className="tasks-inner-container">
          {filteredTasks.length > 0 ? (
            <div className="tasks-container">
              <div className="tasks">
                {filteredTasks.map((task) => {
                  taskNumber++
                  return (
                    <TaskItem
                      key={task.id}
                      token={token}
                      task={task}
                      setTasks={setTasks}
                      taskNumber={taskNumber}
                    />
                  )
                })}
              </div>
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
