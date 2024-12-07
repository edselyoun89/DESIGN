const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/design_project');
    console.log('Подключение к MongoDB выполнено');
  } catch (err) {
    console.error('Ошибка подключения к базе данных:', err.message);
    process.exit(1); // Завершение процесса при ошибке подключения
  }
};

module.exports = connectDB;
