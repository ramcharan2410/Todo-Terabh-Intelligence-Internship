import React, { useState } from 'react'
import { ArrowCircleUp } from 'phosphor-react'

const NewTaskForm = ({ token, tasks, setTasks }) => {
  const [newTask, setNewTask] = useState({
    id: 0,
    name: '',
    status: 'Pending',
  })

  const serverAddr = 'http://127.0.0.1:8000'

  const generateUniqueId = () => {
    const maxId = Math.max(...tasks.map((task) => task.id), 0)
    return maxId + 1
  }

  const handleCreateTask = async (e) => {
    e.preventDefault()
    const taskId = generateUniqueId()
    const taskWithId = { ...newTask, id: taskId }
    try {
      const response = await fetch(`${serverAddr}/create_task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, task: taskWithId.name }),
      })
      const data = await response.json()
      console.log(data)
      if (response.ok) {
        setTasks((prevTasks) => [...prevTasks, taskWithId])
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
          <ArrowCircleUp size={80} color="#fcfcfc" weight="fill" />
        </button>
      </form>
    </div>
  )
}

export default NewTaskForm
