const mongoose = require('mongoose');
const connectDB = require('./db');
const Design = require('./models/Design');

// Тестовые данные
const seedData = [
    {
        title: 'Минималистичный Дизайн',
        picture: '/images/minDesign.jpg',
        desc: 'Минималистичный дизайн характеризуется простотой, чистотой и функциональностью.',
    },
    {
        title: 'Модерн Дизайн',
        picture: '/images/modernDesign.jpg',
        desc: 'Модерн дизайн подчеркивает современные элементы, яркие цвета и инновационные формы.',
    },
    {
        title: 'Ретро Дизайн',
        picture: '/images/retroDesign.jpg',
        desc: 'Ретро дизайн сочетает в себе элементы из прошлого и уникальную атмосферу ностальгии.',
    },
];

const seedDatabase = async () => {
    try {
        await connectDB();
        await Design.deleteMany(); // Очистить коллекцию перед добавлением
        await Design.insertMany(seedData);
        console.log('База данных успешно заполнена');
        process.exit();
    } catch (err) {
        console.error('Ошибка заполнения базы данных:', err.message);
        process.exit(1);
    }
};

seedDatabase();
