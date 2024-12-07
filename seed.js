const mongoose = require('mongoose');
const Design = require('./models/Design'); // Подключение схемы

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/design_project', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Тестовые данные
const seedData = [
  {
    title: "MinDesign",
    picture: "/images/minDesign.jpg",
    desc: "Минималистичный дизайн характеризуется простотой, чистотой и функциональностью.",
    category: "Минимализм"
  },
  {
    title: "ModDesign",
    picture: "/images/modernDesign.jpg",
    desc: "Модерн дизайн подчеркивает современные элементы, яркие цвета и инновационные формы.",
    category: "Модерн"
  },
  {
    title: "RetroDesign",
    picture: "/images/retroDesign.jpg",
    desc: "Ретро дизайн сочетает в себе элементы из прошлого и уникальную атмосферу ностальгии.",
    category: "Ретро"
  }
];

// Функция для заполнения базы
const seedDatabase = async () => {
  try {
    await Design.deleteMany(); // Удалить все существующие записи
    await Design.insertMany(seedData); // Добавить новые данные
    console.log("База данных успешно заполнена!");
    mongoose.connection.close(); // Закрыть соединение с базой
  } catch (err) {
    console.error("Ошибка заполнения базы данных:", err.message);
  }
};

// Запуск функции
seedDatabase();
