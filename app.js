const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const engine = require('ejs-locals'); // Подключение ejs-locals для шаблонов
const connectDB = require('./db'); // Подключение функции для соединения с базой данных
const session = require('express-session'); // Подключаем express-session
const MongoStore = require('connect-mongo'); // Подключаем хранилище MongoDB для сессий


// Инициализация приложения
const app = express();

// Настройка сессий с использованием MongoDB
app.use(
  session({
    secret: 'your_secret_key', // Уникальный ключ для подписи сессий
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost/design_project', // URL MongoDB
      collectionName: 'sessions', // Имя коллекции для хранения сессий
    }),
    cookie: { secure: false, maxAge: 3600000 }, // Настройка cookie (1 час)
  })
);

// Подключение к базе данных
connectDB();

// Установка шаблонизатора ejs-locals
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Подключение middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Подключение маршрутов
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Обработка ошибок 404
app.use(function (req, res, next) {
  next(createError(404));
});

// Обработчик ошибок
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
