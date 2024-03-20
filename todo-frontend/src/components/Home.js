import React from 'react'
import { useState, useEffect } from 'react'
import Header from './Header.js'
import NewTaskForm from './NewTaskForm.js'
import TaskList from './TaskList.js'
import Footer from './Footer.js'

const Home = ({ userName, email }) => {
  return (
    <>
      <Header userName={userName} email={email} />
      <TaskList />
      <NewTaskForm />
      <Footer />
    </>
  )
}

export default Home
