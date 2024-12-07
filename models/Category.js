const mongoose = require('mongoose');

// Определение схемы для категорий
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true }, // Название категории
  createdAt: { type: Date, default: Date.now } // Дата создания
});

// Экспорт модели
module.exports = mongoose.model('Category', CategorySchema);
