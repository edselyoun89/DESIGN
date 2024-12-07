var express = require('express');
var router = express.Router();
const Design = require('../models/Design'); // Подключение модели Design
const User = require('../models/User'); // Подключение модели User


/* GET главная страница */
router.get('/', function (req, res, next) {
  if (!req.session.views) {
    req.session.views = 1; // Если сессии нет, задаём начальное значение
  } else {
    req.session.views++; // Увеличиваем количество посещений
  }

  res.render('index', {
    title: 'Добро пожаловать на Design Project',
    views: req.session.views, // Передаём количество посещений в шаблон
    designs: [],
    hideNoDesignsMessage: true,
  });
});

/* GET login/registration page. */
router.get('/logreg', function(req, res, next) {
  res.render('logreg',{title: 'Вход'});
  });

router.post('/login', async function (req, res, next) {
  const { username, password } = req.body;

  try {
    // Поиск пользователя
    const user = await User.findOne({ username });
    if (!user) {
      return res.render('login', {
        title: 'Вход',
        errorMessage: 'Неправильное имя пользователя или пароль',
      });
    }

    // Проверка пароля
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.render('login', {
        title: 'Вход',
        errorMessage: 'Неправильное имя пользователя или пароль',
      });
    }

    // Успешный вход
    req.session.user = { id: user._id, username: user.username };
    res.redirect('/');
  } catch (err) {
    console.error('Ошибка входа:', err);
    res.render('login', {
      title: 'Вход',
      errorMessage: 'Произошла ошибка. Попробуйте снова.',
    });
  }
});



// GET страница регистрации
router.get('/register', (req, res) => {
  res.render('register', { title: 'Регистрация', errorMessage: null });
});

// POST запрос для регистрации
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
      // Проверка, существует ли пользователь
      const existingUser = await User.findOne({ username });
      if (existingUser) {
          return res.render('register', {
              title: 'Регистрация',
              errorMessage: 'Пользователь с таким именем уже существует.',
          });
      }

      // Создание нового пользователя
      const newUser = new User({ username, password });
      await newUser.save();

      // Редирект на главную страницу или страницу входа
      res.redirect('/login');
  } catch (err) {
      console.error('Ошибка при регистрации:', err.message);
      res.render('register', {
          title: 'Регистрация',
          errorMessage: 'Произошла ошибка. Попробуйте снова.',
      });
  }
});






/* GET установка cookie */
router.get('/set-cookie', function (req, res, next) {
  // Установка cookie
  res.cookie('userSession', 'active', { maxAge: 3600000, httpOnly: true }); // Cookie с действием на 1 час
  res.send('Cookie установлена');
});

/* GET удаление cookie */
router.get('/clear-cookie', function (req, res, next) {
  // Очистка cookie
  res.clearCookie('userSession');
  res.send('Cookie очищена');
});

/* GET страница со списком всех дизайнов */
router.get('/designs', async function (req, res, next) {
  try {
    const designs = await Design.find(); // Получить все дизайны
    res.render('designs', { 
      title: 'Список всех дизайнов', 
      designs,
      searchQuery: '' // Передать пустую строку для поля поиска
    });
  } catch (err) {
    console.error('Ошибка загрузки дизайнов:', err.message);
    res.status(500).send('Ошибка загрузки данных');
  }
});


/* GET страница добавления нового дизайна */
router.get('/add', function (req, res, next) {
  res.render('add', { title: 'Добавить новый дизайн' });
});

/* POST запрос для добавления нового дизайна */
router.post('/add', async function (req, res, next) {
  try {
    const { title, picture, desc } = req.body;
    const newDesign = new Design({ title, picture, desc });
    await newDesign.save(); // Сохранение дизайна в базе данных
    res.redirect('/designs'); // Перенаправление на страницу со всеми дизайнами
  } catch (err) {
    console.error('Ошибка добавления дизайна:', err.message);
    res.status(500).send('Ошибка добавления дизайна');
  }
});

/* GET запрос для поиска дизайнов */
router.get('/search', async function (req, res, next) {
  try {
    const query = req.query.q || ''; // Получить поисковый запрос, если он есть
    const designs = await Design.find({
      title: { $regex: query, $options: 'i' } // Регистронезависимый поиск по названию
    });

    res.render('designs', { 
      title: 'Результаты поиска', 
      designs, 
      searchQuery: query // Передать поисковый запрос в шаблон
    });
  } catch (err) {
    console.error('Ошибка поиска дизайнов:', err.message);
    res.status(500).send('Ошибка поиска');
  }
});



/* GET запрос для редактирования дизайна */
router.get('/edit/:id', async function (req, res, next) {
  try {
    const design = await Design.findById(req.params.id); // Найти дизайн по ID
    if (!design) {
      return res.status(404).send('Дизайн не найден');
    }
    res.render('edit', { title: 'Редактировать дизайн', design });
  } catch (err) {
    console.error('Ошибка загрузки дизайна для редактирования:', err.message);
    res.status(500).send('Ошибка загрузки данных');
  }
});

/* POST запрос для обновления дизайна */
router.post('/edit/:id', async function (req, res, next) {
  try {
    const { title, picture, desc } = req.body;
    await Design.findByIdAndUpdate(req.params.id, { title, picture, desc }); // Обновить дизайн
    res.redirect('/designs'); // Перенаправление на страницу со всеми дизайнами
  } catch (err) {
    console.error('Ошибка обновления дизайна:', err.message);
    res.status(500).send('Ошибка обновления данных');
  }
});

/* GET запрос для удаления дизайна */
router.get('/delete/:id', async function (req, res, next) {
  try {
    await Design.findByIdAndDelete(req.params.id); // Удалить дизайн по ID
    res.redirect('/designs'); // Перенаправление на страницу со всеми дизайнами
  } catch (err) {
    console.error('Ошибка удаления дизайна:', err.message);
    res.status(500).send('Ошибка удаления данных');
  }
});








router.get('/check-session', (req, res) => {
  if (!req.session.viewCount) {
      req.session.viewCount = 1;
  } else {
      req.session.viewCount += 1;
  }
  console.log('Текущая сессия:', req.session);
  res.send(`Вы посетили эту страницу ${req.session.viewCount} раз.`);
});

/* GET страницы дизайнов по названию (title). */
router.get('/:designTitle', async function (req, res, next) {
  try {
    const design = await Design.findOne({ title: req.params.designTitle }); // Найти дизайн по названию
    if (!design) {
      return res.status(404).send('Дизайн не найден');
    }
    res.render('design', {
      title: design.title,
      picture: design.picture,
      desc: design.desc,
    });
  } catch (err) {
    console.error('Ошибка загрузки дизайна:', err.message);
    res.status(500).send('Ошибка загрузки данных');
  }
});


/* GET страница конкретного дизайна по ID */
router.get('/design/:designId', async function (req, res, next) {
  try {
    const designId = req.params.designId; // Извлечение параметра из URL
    const design = await Design.findById(designId); // Поиск дизайна по ID

    if (!design) {
      return res.status(404).send('Дизайн не найден');
    }

    res.render('design', {
      title: design.title,
      picture: design.picture,
      desc: design.desc,
    });
  } catch (err) {
    console.error('Ошибка загрузки дизайна:', err.message);
    res.status(500).send('Ошибка загрузки данных');
  }
});

module.exports = router;
