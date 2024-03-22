import React from 'react'
import { useState } from 'react'
import ArrowCircleUpRoundedIcon from '@mui/icons-material/ArrowCircleUpRounded'

const NewTaskForm = ({ token, setTasks }) => {
  const [newTask, setNewTask] = useState({
    name: '',
    status: 'Pending',
  })
  const serverAddr = 'http://127.0.0.1:8000'

  const handleCreateTask = async (e) => {
    e.preventDefault()
    // console.log(newTask.name)
    try {
      const response = await fetch(`${serverAddr}/create_task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, task: newTask.name }),
      })
      const data = await response.json()
      console.log(data)
      if (response.ok) {
        setTasks((prevTasks) => [...prevTasks, newTask])
      } else {
        console.log(data.detail[0].msg)
      }
    } catch (error) {
      console.log('Error during New Task Form Submission: ', error.message)
    }
  }

  const handleNewTaskChange = (e) => {
    setNewTask((prevState) => ({ ...prevState, name: e.target.value }))
  }

  return (
    <div className="new-task-form-container">
      <form className="new-task-form" onSubmit={(e) => handleCreateTask(e)}>
        <input
          className="new-task-input"
          placeholder="Enter new task here ..."
          value={newTask.name}
          onChange={(e) => handleNewTaskChange(e)}
          required
        />
        <button type="submit">
          Submit
          {/* Icon is not working here! */}
        </button>
      </form>
    </div>
  )
}

export default NewTaskForm
