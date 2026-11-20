let tasks = [
  { id: 1, title: 'Software Testing Course', completed: true },
  { id: 2, title: 'Mobile App Development', completed: true },
  { id: 3, title: 'Fullstack Web Development', completed: false },
];

export const getTasks = (req, res, next) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(tasks.slice(0, limit));
  }

  res.status(200).json(tasks);
};
export const getTask = (req, res, next) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    const error = new Error(`A task with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  res.status(200).json(task);
};

export const createTask = (req, res, next) => {
  const { title } = req.body;

  if (!title || !title.trim()) {
    const error = new Error('Please include a task title');
    error.status = 400;
    return next(error);
  }
  const newTask = {
    id: tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
    title: title.trim(),
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

export const updateTask = (req, res, next) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    const error = new Error(`A task with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  if (req.body.title !== undefined) task.title = req.body.title.trim();
  if (req.body.completed !== undefined) task.completed = Boolean(req.body.completed);

  res.status(200).json(task);
};
export const deleteTask = (req, res, next) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    const error = new Error(`A task with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  tasks.splice(index, 1);
  res.status(200).json(tasks);
};