import { useState } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Watch React Crash Course on Youtube',
      day: 'Nov 23rd at 9:00am',
      reminder: true,
    },
    {
      id: 2,
      text: 'Start creating a React App for my Coursework',
      day: 'Nov 25th at 11:00am',
      reminder: true,
    },
    {
      id: 3,
      text: 'Update learning diary and push to GitHub',
      day: 'Nov 26th at 15:30pm',
      reminder: false,
    },
  ]);

  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  return (
    <div className="container">
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks
          tasks={tasks}
          onDelete={deleteTask}
          onToggle={toggleReminder}
        />
      ) : (
        'Hey Serge!, There is No Tasks To Show. Create a new task by clicking the Add button above'
      )}
    </div>
  );
}

export default App;