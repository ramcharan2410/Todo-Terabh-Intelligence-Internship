import { useState } from 'react'
import React from 'react'
import TaskItem from './TaskItem.js'

const TaskList = ({ token, tasks, setTasks }) => {
  const handleTaskCheck = async (e) => {}
  const handleTaskDelete = async (e) => {}
  return (
    <div className="task-list-container">
      <div className="tasks-title">Tasks</div>
      {/* Include how many are pending and how many are done, etc! */}
      {/* Include motivational things like, Don't give up! (strength arm emoji!) */}
      <div className="tasks">
        {/* flex-direction: column */}
        {tasks.map((task) => {
          return (
            <TaskItem
              task={task}
              tasks={tasks}
              setTasks={setTasks}
              handleTaskCheck={handleTaskCheck}
              handleTaskDelete={handleTaskDelete}
            />
          )
        })}
      </div>
    </div>
  )
}

export default TaskList
