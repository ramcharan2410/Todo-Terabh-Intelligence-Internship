import React, { useState, useEffect, useRef } from 'react'
import { Check, TrashSimple } from 'phosphor-react'

const TaskItem = ({ token, task, setTasks, taskNumber }) => {
  const [isEditable, setIsEditable] = useState(false)
  const [inputValue, setInputValue] = useState(task.name)
  const [previousName, setPreviousName] = useState('')
  const serverAddr = 'http://127.0.0.1:8000'
  const inputRef = useRef(null)

  useEffect(() => {
    if (isEditable && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditable])

  const handleUpdateClick = async () => {
    if (inputValue !== '') {
      await handleTaskUpdate()
    }
  }
  const handleEnterKeyPress = async (e) => {
    if (e.key === 'Enter') {
      await handleTaskNameBlur()
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
        body: JSON.stringify({
          token,
          task: updatedTask.name,
          id: updatedTask.id,
        }),
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

  const handleTaskDone = async () => {
    try {
      const response = await fetch(`${serverAddr}/done_task`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, id: task.id }),
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

  const handleTaskDelete = async () => {
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

  const handleTaskNameClick = () => {
    setIsEditable(true)
    setPreviousName(task.name)
  }

  const handleTaskNameBlur = async () => {
    setIsEditable(false)
    if (inputValue === '') {
      setInputValue(previousName)
    } else {
      await handleUpdateClick()
    }
  }

  return (
    <div className="task-item-container">
      <span className="task-title">task {taskNumber}:</span>
      <div className="task-info">
        {isEditable ? (
          <input
            className="task-input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => handleEnterKeyPress(e)}
            onBlur={handleTaskNameBlur}
            ref={inputRef}
          />
        ) : (
          <div className="task-name" onClick={handleTaskNameClick}>
            {task.name}
          </div>
        )}
      </div>
      <button className="done-button" onClick={handleTaskDone}>
        {task.status === 'Pending' ? (
          <Check size={50} color="white" weight="thin" />
        ) : (
          <Check size={50} color="white" weight="bold" />
        )}
      </button>
      <button onClick={handleTaskDelete}>
        <TrashSimple size={50} color="white" weight="bold" />
      </button>
    </div>
  )
}

export default TaskItem
