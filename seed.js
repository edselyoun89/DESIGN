const mongoose = require('mongoose');
const Design = require('./models/Design');

// Подключение к MongoDB
mongoose.connect('mongodb://localhost/design_project', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Тестовые данные
const seedData = [
  {
    title: "MinDesign",
    picture: "/images/minDesign.jpg",
    desc: "Минималистичный дизайн характеризуется простотой, чистотой и функциональностью."
  },
  {
    title: "ModDesign",
    picture: "/images/modernDesign.jpg",
    desc: "Модерн дизайн подчеркивает современные элементы, яркие цвета и инновационные формы."
  },
  {
    title: "RetroDesign",
    picture: "/images/retroDesign.jpg",
    desc: "Ретро дизайн сочетает в себе элементы из прошлого и уникальную атмосферу ностальгии."
  }
];

// Функция для заполнения базы
const seedDatabase = async () => {
  try {
    await Design.deleteMany(); // Удалить все существующие записи
    await Design.insertMany(seedData); // Добавить новые данные
    console.log('База данных успешно заполнена!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Ошибка заполнения базы данных:', err.message);
  }
};

// Запуск функции
seedDatabase();
