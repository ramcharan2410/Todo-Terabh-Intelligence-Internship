import React from 'react'

export default function Footer() {
  const getYear = () => {
    const today = new Date()
    return today.getFullYear()
  }
  return (
    <div className="home-footer">
      Terabh Intelligence - Copyright &copy; {getYear()}
    </div>
  )
}
