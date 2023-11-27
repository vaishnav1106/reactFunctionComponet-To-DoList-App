import React, { useState } from 'react';
import './App.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index].text);
  };

  const saveEditing = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = editingText;
    setTasks(updatedTasks);
    setEditingIndex(null);
  };

  const cancelEditing = () => {
    setEditingIndex(null);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setEditingIndex(null);
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <table className="table" style={{ width: '40%', margin: 'auto', marginTop: '10px', borderCollapse: 'collapse',position:'related', }}>
        <thead>
          <tr>
            <th style={{ padding: '2px' }}>Complete</th>
            <th style={{ padding: '2px' }}>Task</th>
            <th style={{ padding: '2px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td style={{ padding: '1px' }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(index)}
                />
              </td>
              <td style={{ padding: '1px' }}>
                {editingIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                      {task.text}
                    </span>
                  </>
                )}
              </td>
              <td style={{ padding: '1px' }}>
                {editingIndex === index ? (
                  <>
                    <button onClick={() => saveEditing(index)}>Save</button>
                    <button onClick={cancelEditing}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEditing(index)}>Edit</button>
                    <button onClick={() => deleteTask(index)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

export default App;
