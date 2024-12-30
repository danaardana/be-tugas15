const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const HapiCors = require('@hapi/cors');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });

  // Enable CORS
  await server.register(HapiCors);
  server.auth.strategy('default', 'cors');

  // Koneksi ke MongoDB
  mongoose.connect('mongodb://localhost/todo_db', { useNewUrlParser: true, useUnifiedTopology: true });

  const todoSchema = new mongoose.Schema({
    task: String,
    completed: { type: Boolean, default: false }
  });

  const Todo = mongoose.model('Todo', todoSchema);

  // Rute untuk mendapatkan semua tugas
  server.route({
    method: 'GET',
    path: '/api/todos',
    handler: async (request, h) => {
      const todos = await Todo.find();
      return h.response(todos).code(200);
    }
  });

  // Rute untuk menambahkan tugas
  server.route({
    method: 'POST',
    path: '/api/todos',
    handler: async (request, h) => {
      const todo = new Todo(request.payload);
      await todo.save();
      return h.response(todo).code(201);
    }
  });

  // Rute untuk memperbarui tugas
  server.route({
    method: 'PUT',
    path: '/api/todos/{id}',
    handler: async (request, h) => {
      const { id } = request.params;
      const updatedTodo = await Todo.findByIdAndUpdate(id, request.payload, { new: true });
      return h.response(updatedTodo).code(200);
    }
  });

  // Rute untuk menghapus tugas
  server.route({
    method: 'DELETE',
    path: '/api/todos/{id}',
    handler: async (request, h) => {
      const { id } = request.params;
      await Todo.findByIdAndDelete(id);
      return h.response({ message: 'Task deleted' }).code(204);
    }
  });

  await server.start();
  console.log('Server berjalan di http://localhost:3000');
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
