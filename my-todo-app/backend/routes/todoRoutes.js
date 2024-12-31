const express = require('express');
const { addTodo, getTodos, deleteTodo } = require('../controllers/todoController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Rute untuk menambahkan, mendapatkan, dan menghapus Todo
router.post('/', verifyToken, addTodo); // Menambahkan Todo
router.get('/', verifyToken, getTodos); // Mendapatkan semua Todo
router.delete('/:id', verifyToken, deleteTodo); // Menghapus Todo berdasarkan ID

module.exports = router;
