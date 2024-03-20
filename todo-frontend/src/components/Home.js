import React from 'react'
import { useState, useEffect } from 'react'
import Header from './Header.js'
import NewTaskForm from './NewTaskForm.js'
import TaskList from './TaskList.js'
import Footer from './Footer.js'
const Home = ({ email, token }) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const serverAddr = 'http://127.0.0.1:8000'
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${serverAddr}/get_task`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        })
        const data = await response.json()
        console.log(data)
        if (data) {
          setTasks(data)
          setLoading(false)
        }
      } catch (error) {
        console.error('Error fetching books:', error)
        setLoading(false)
      }
    }
    fetchTasks()
  }, [])
  return (
    <div className="home">
      <Header email={email} />
      <div className="task-container">
        <TaskList token={token} tasks={tasks} setTasks={setTasks} />
        <NewTaskForm token={token} setTasks={setTasks} />
      </div>
      <Footer />
    </div>
  )
}

export default Home
