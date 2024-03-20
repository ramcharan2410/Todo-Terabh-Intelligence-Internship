import React, { useState, useEffect } from 'react'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
const TaskItem = ({
  task,
  tasks,
  setTasks,
  handleTaskCheck,
  handleTaskDelete,
}) => {
  return (
    <div className="task-item-container">
      <div className="task-info">{task.name}</div>
      <button onClick={(e) => handleTaskCheck(e)}>
        {task.status === 'Pending' ? (
          <ClearOutlinedIcon />
        ) : (
          <DoneOutlinedIcon />
        )}
      </button>
      <button onClick={(e) => handleTaskDelete(e)}>
        <DeleteOutlinedIcon />
      </button>
    </div>
  )
}

export default TaskItem
