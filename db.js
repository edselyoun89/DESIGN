const mongoose = require('mongoose');

// Подключение к базе данных MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/design_project'); // Убедитесь, что имя базы верное
        console.log('MongoDB подключена успешно');
    } catch (err) {
        console.error('Ошибка подключения к MongoDB:', err.message);
        process.exit(1); // Остановить процесс в случае ошибки
    }
};

module.exports = connectDB;
