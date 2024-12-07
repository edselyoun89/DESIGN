const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost/design_project'); // Проверьте имя базы данных
    console.log('Успешное подключение к базе данных');
  } catch (err) {
    console.error('Ошибка подключения к базе данных:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
