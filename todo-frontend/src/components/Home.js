import React, { useState, useEffect } from 'react'
import Header from './Header.js'
import TaskList from './TaskList.js'
import NewTaskForm from './NewTaskForm.js'
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
        if (response.ok) {
          console.log('Tasks Fetched successfully')
          setTasks(data)
          setLoading(false)
        } else {
          console.log(data.detail[0].msg)
        }
      } catch (error) {
        console.error('Error fetching tasks:', error)
        setLoading(false)
      }
    }
    fetchTasks()
  }, [])
  return (
    <div className="home">
      <Header email={email} />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <TaskList token={token} tasks={tasks} setTasks={setTasks} />
        )}
        <NewTaskForm token={token} setTasks={setTasks} />
      <Footer />
    </div>
  )
}

export default Home
