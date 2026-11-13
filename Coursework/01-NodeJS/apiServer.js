import http from 'http';

const PORT = process.env.PORT || 8000;

// In-memory data store
const tasks = [
  { id: 1, title: 'Set up GitHub repository', completed: true },
  { id: 2, title: 'Build raw Node.js HTTP server', completed: true },
  { id: 3, title: 'Test REST API with Postman', completed: false }
];

// 1. Logger Middleware
const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};

// 2. JSON Content-Type Middleware
const jsonMiddleware = (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
};

// Route Handler: GET /api/tasks
const getTasksHandler = (req, res) => {
  res.statusCode = 200;
  res.end(JSON.stringify(tasks));
};

// Route Handler: GET /api/tasks/:id
const getTaskByIdHandler = (req, res) => {
  const id = parseInt(req.url.split('/')[3]);
  const task = tasks.find((t) => t.id === id);

  if (task) {
    res.statusCode = 200;
    res.end(JSON.stringify(task));
  } else {
    notFoundHandler(req, res, 'Task not found');
  }
};

// Route Handler: POST /api/tasks
const createTaskHandler = (req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const { title } = JSON.parse(body);
      if (!title) {
        res.statusCode = 400;
        return res.end(JSON.stringify({ message: 'Task title is required' }));
      }
      const newTask = {
        id: tasks.length + 1,
        title,
        completed: false
      };
      tasks.push(newTask);
      res.statusCode = 201;
      res.end(JSON.stringify(newTask));
    } catch (err) {
      res.statusCode = 400;
      res.end(JSON.stringify({ message: 'Invalid JSON payload' }));
    }
  });
};

// 404 Not Found Handler
const notFoundHandler = (req, res, message = 'Route not found') => {
  res.statusCode = 404;
  res.end(JSON.stringify({ message }));
};

const server = http.createServer((req, res) => {
  logger(req, res, () => {
    jsonMiddleware(req, res, () => {
      if (req.url === '/api/tasks' && req.method === 'GET') {
        getTasksHandler(req, res);
      } else if (req.url.match(/^\/api\/tasks\/([0-9]+)$/) && req.method === 'GET') {
        getTaskByIdHandler(req, res);
      } else if (req.url === '/api/tasks' && req.method === 'POST') {
        createTaskHandler(req, res);
      } else {
        notFoundHandler(req, res);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Task REST API running on http://localhost:${PORT}`);
});