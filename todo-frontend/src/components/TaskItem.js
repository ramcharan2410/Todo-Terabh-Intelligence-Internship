import React, { useState, useEffect, useRef } from 'react'
import { X, Check, TrashSimple } from 'phosphor-react'

const TaskItem = ({ token, task, tasks, setTasks }) => {
  const [isEditable, setIsEditable] = useState(false)
  const [inputValue, setInputValue] = useState(task.name)
  const [updateButton, setUpdateButton] = useState('Edit')
  const serverAddr = 'http://127.0.0.1:8000'
  const inputRef = useRef(null)

  useEffect(() => {
    if (isEditable && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditable])

  const handleUpdateClick = async (e) => {
    setIsEditable((current) => !current)
    setUpdateButton((current) => (current === 'Edit' ? 'Confirm' : 'Edit'))

    if (inputValue !== '') {
      await handleTaskUpdate()
    }
  }

  const handleEnterKeyPress = async (e) => {
    if (e.key === 'Enter') {
      setIsEditable((current) => !current)
      setUpdateButton('Edit')

      if (inputValue !== '') {
        await handleTaskUpdate()
      }
    }
  }

  const handleTaskUpdate = async () => {
    const updatedTask = { ...task, name: inputValue }

    try {
      const response = await fetch(`${serverAddr}/update_task`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, task: updatedTask, id: task.id }),
      })

      const data = await response.json()
      console.log(data)
      if (response.ok) {
        console.log('Task updated successfully')
        setTasks((currTasks) =>
          currTasks.map((eachTask) =>
            eachTask.id === task.id ? updatedTask : eachTask
          )
        )
      } else {
        console.log(data.detail[0].msg)
      }
    } catch (error) {
      console.error('Error updating Task:', error.message)
    }
  }

  const handleTaskDone = async (e) => {
    try {
      const response = await fetch(`${serverAddr}/done_task`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, id: parseInt(task.id) }),
      })

      const data = await response.json()
      console.log(data)
      if (response.ok) {
        console.log('Task marked as done')
        setTasks((prevTasks) =>
          prevTasks.map((eachTask) =>
            eachTask.id === task.id
              ? { ...task, status: 'Completed' }
              : eachTask
          )
        )
      } else {
        console.log(data.detail[0].msg)
      }
    } catch (error) {
      console.error('Error during marking task as done:', error.message)
    }
  }

  const handleTaskDelete = async (e) => {
    try {
      const response = await fetch(`${serverAddr}/delete_task`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, id: task.id }),
      })

      const data = await response.json()
      console.log(data)
      if (response.ok) {
        console.log('Task deleted successfully')
        setTasks((prevTasks) =>
          prevTasks.filter((eachTask) => eachTask.id !== task.id)
        )
      } else {
        console.log(data.detail[0].msg)
      }
    } catch (error) {
      console.error('Error deleting task:', error.message)
    }
  }

  return (
    <div className="task-item-container">
      <div className="task-info">
        <input
          className="task-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => handleEnterKeyPress(e)}
          ref={inputRef}
        />
      </div>
      <button
        className="update-task"
        onClick={(e) => {
          handleUpdateClick(e)
        }}
      >
        {updateButton}
      </button>
      <button onClick={(e) => handleTaskDone(e)}>
        {task.status === 'Pending' ? (
          <X size={32} color="#fcfcfc" weight="bold" />
        ) : (
          <Check size={32} color="#fcfcfc" weight="bold" />
        )}
      </button>
      <button onClick={(e) => handleTaskDelete(e)}>
        <TrashSimple size={32} color="#fcfcfc" weight="fill" />
      </button>
    </div>
  )
}

export default TaskItem
