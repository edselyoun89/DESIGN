const mongoose = require('mongoose');

// Определение схемы для дизайнов
const DesignSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Название дизайна
  picture: { type: String, required: true }, // Ссылка на изображение
  desc: { type: String, required: true }, // Описание дизайна
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Категория
  createdAt: { type: Date, default: Date.now } // Дата создания
});

// Экспорт модели
module.exports = mongoose.model('Design', DesignSchema);
