// backend/controllers/todoController.js
const Todo = require('../models/Todo');

// Menambahkan Todo baru
exports.addTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTodo = new Todo({
            title,
            description,
            user: req.user.id, // Mengaitkan Todo dengan pengguna yang terautentikasi
        });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: 'Error adding todo', error: error.message });
    }
};

// Mendapatkan semua Todo
exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id }); // Hanya ambil Todo milik pengguna
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todos', error: error.message });
    }
};
exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting todo', error: error.message });
    }
};
