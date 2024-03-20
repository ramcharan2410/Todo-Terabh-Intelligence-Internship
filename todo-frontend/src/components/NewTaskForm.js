import { useState } from 'react';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import React from 'react';

const NewTaskForm = ({ token, setTasks }) => {
  const [newTask, setNewTask] = useState({
    name: '',
    status: 'Pending',
  });
  const serverAddr = 'http://127.0.0.1:8000';

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${serverAddr}/create_task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, task: newTask.name }),
      });
      const data = await response.json();
      if (response.ok) {
        setTasks((prevTasks) => [...prevTasks, newTask]);
      } else {
        console.log(data.detail[0].msg);
      }
    } catch (error) {
      console.log('Error during New Task Form Submission: ', error.message);
    }
  };

  const handleNewTask = (e) => {
    setNewTask((prevState) => ({ ...prevState, name: e.target.value }));
  };

  return (
    <div className="new-task-form-container">
      <form className="new-book-form" onSubmit={(e) => handleFormSubmit(e)}>
        <input
          className="newTask-input"
          placeholder="Enter new task here ..."
          value={newTask.name}
          onChange={(e) => handleNewTask(e)}
          required
        />
        <button type="submit">
          <ArrowCircleUpOutlinedIcon />
        </button>
      </form>
    </div>
  );
};

export default NewTaskForm;