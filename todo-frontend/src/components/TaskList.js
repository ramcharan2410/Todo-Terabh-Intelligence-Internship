import { useState } from 'react'
import React from 'react'
import TaskItem from './TaskItem.js'

const TaskList = (props) => {
  return (
    <div className="task-list-container">
      <div className="tasks-info"></div>
      {/* Include how many are pending and how many are done, etc! */}
      {/* Include motivational things like, Don't give up! (strength arm emoji!) */}
    </div>
  )
}

export default TaskList
