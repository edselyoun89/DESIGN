const mongoose = require('mongoose');
const Design = require('./models/Design'); // Подключение схемы Design
const Category = require('./models/Category'); // Подключение схемы Category

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/design_project', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Функция для заполнения базы
const seedDatabase = async () => {
  try {
    // Очистка базы данных
    await Category.deleteMany();
    await Design.deleteMany();

    // Создание категорий
    const minimalism = await Category.create({ name: 'Минимализм' });
    const modern = await Category.create({ name: 'Модерн' });
    const retro = await Category.create({ name: 'Ретро' });

    // Тестовые данные для дизайнов
    const seedData = [
      {
        title: "MinDesign",
        picture: "/images/minDesign.jpg",
        desc: "Минималистичный дизайн характеризуется простотой, чистотой и функциональностью.",
        category: minimalism._id // Связь с категорией Минимализм
      },
      {
        title: "ModDesign",
        picture: "/images/modernDesign.jpg",
        desc: "Модерн дизайн подчеркивает современные элементы, яркие цвета и инновационные формы.",
        category: modern._id // Связь с категорией Модерн
      },
      {
        title: "RetroDesign",
        picture: "/images/retroDesign.jpg",
        desc: "Ретро дизайн сочетает в себе элементы из прошлого и уникальную атмосферу ностальгии.",
        category: retro._id // Связь с категорией Ретро
      }
    ];

    // Заполнение базы данных дизайнами
    await Design.insertMany(seedData);

    console.log("База данных успешно заполнена!");
    mongoose.connection.close(); // Закрыть соединение с базой данных
  } catch (err) {
    console.error("Ошибка заполнения базы данных:", err.message);
    mongoose.connection.close(); // Закрыть соединение в случае ошибки
  }
};

// Запуск функции
seedDatabase();
