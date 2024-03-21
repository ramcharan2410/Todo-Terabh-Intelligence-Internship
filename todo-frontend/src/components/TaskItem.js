import React, { useState, useEffect, useRef } from 'react'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'

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
  const handleUpdateClick = (e) => {
    setIsEditable((current) => !current)
    setUpdateButton((current) => {
      if (current === 'Edit') {
        return 'Confirm'
      } else {
        return 'Edit'
      }
    })
  }
  const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      setIsEditable((current) => !current)
      setUpdateButton('Edit')
    }
  }
  const handleTaskUpdate = async (e) => {
    const inputValue = e.target.value
    if (inputValue === '') {
      return
    }
    const updatedTask = { ...task, name: inputValue }

    try {
      const response = await fetch(`${serverAddr}/update_task`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, task: updatedTask, id: task.id }),
        // id should be integer
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
          onChange={(e) => handleTaskUpdate(e)}
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
