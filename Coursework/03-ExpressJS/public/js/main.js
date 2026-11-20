const output = document.querySelector('#output');
const button = document.querySelector('#get-tasks-btn');
const form = document.querySelector('#add-task-form');

async function showTasks() {
  try {
    const res = await fetch('/api/tasks');
    if (!res.ok) throw new Error('Failed to fetch tasks');

    const tasks = await res.json();
    output.innerHTML = '';

    tasks.forEach((task) => {
      const taskEl = document.createElement('div');
      taskEl.className = 'task';
      taskEl.textContent = `#${task.id} — ${task.title} ${task.completed ? 'Completed' : 'Pending'}`;
      output.appendChild(taskEl);
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}

async function addTask(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const title = formData.get('title');

  try {
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) throw new Error('Failed to add task');

    this.reset();
    showTasks();
  } catch (error) {
    console.error('Error adding task:', error);
  }
}

button.addEventListener('click', showTasks);
form.addEventListener('submit', addTask);
showTasks();