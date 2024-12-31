const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Mengaitkan Todo dengan pengguna
}, {
    timestamps: true, // Menambahkan createdAt dan updatedAt
});

module.exports = mongoose.model('Todo', TodoSchema);
