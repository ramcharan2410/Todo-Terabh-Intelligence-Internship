import React, { useState } from 'react'
import { ArrowCircleUp } from 'phosphor-react'

const NewTaskForm = ({ token, tasks, setTasks }) => {
  const [newTask, setNewTask] = useState({
    id: 0,
    name: '',
    status: 'Pending',
  })

  const serverAddr = 'http://127.0.0.1:8000'
  const handleEnterKeyPress = async (e) => {
    if (e.key === 'Enter') {
      await handleCreateTask(e)
    }
  }
  const handleCreateTask = async (e) => {
    e.preventDefault()
    const trimmedTaskName = newTask.name.trim()
    if (trimmedTaskName === '') {
      return
    }
    try {
      const response = await fetch(`${serverAddr}/create_task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, task: trimmedTaskName }),
      })
      const data = await response.json()
      console.log(data)
      if (response.ok) {
        const taskWithId = { ...newTask, id: data.id }
        console.log(taskWithId)
        setTasks((prevTasks) => [...prevTasks, taskWithId])
        setNewTask((prevState) => ({ ...prevState, name: '', id: 0 }))
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
          onKeyDown={(e) => handleEnterKeyPress(e)}
          required
        />
        <button type="submit">
          <ArrowCircleUp size={80} color="#fcfcfc" weight="fill" />
        </button>
      </form>
    </div>
  )
}

export default NewTaskForm
