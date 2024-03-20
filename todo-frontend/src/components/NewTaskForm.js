import { useState } from 'react'
import React from 'react'

const NewTaskForm = ({ token, setTasks }) => {
  const [newTask, setNewTask] = useState('')
  const serverAddr='http://127.0.0.1:8000'
  return <div className="new-task-form-container">

  </div>
}

export default NewTaskForm
