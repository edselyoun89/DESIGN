const mongoose = require('mongoose');

// Определение схемы для отзывов
const ReviewSchema = new mongoose.Schema({
  designId: { type: mongoose.Schema.Types.ObjectId, ref: 'Design', required: true }, // Связь с дизайном
  username: { type: String, required: true }, // Имя пользователя
  content: { type: String, required: true }, // Текст отзыва
  createdAt: { type: Date, default: Date.now } // Дата создания
});

// Экспорт модели
module.exports = mongoose.model('Review', ReviewSchema);
