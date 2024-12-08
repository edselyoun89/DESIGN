var express = require('express');
var router = express.Router();
const Design = require('../models/Design'); // Подключение модели Design
const User = require('../models/User'); // Подключение модели User
const checkAuth = require('../middlewares/checkAuth'); // Подключение middleware


/* GET главная страница */
router.get('/', function (req, res, next) {
  console.log('Сессия на главной странице:', req.session.user);
  res.render('index', {
    title: 'Добро пожаловать на Design Project',
    user: req.session.user || null, // Передаем данные пользователя
    designs: [], // Список дизайнов
    views: req.session.views || 0, // Счетчик просмотров
  });
});

/* GET страница добавления нового дизайна (только для авторизованных пользователей) */
router.get('/add', checkAuth, (req, res) => {
  res.render('add', { title: 'Добавить новый дизайн' });
});


router.get('/logreg', (req, res) => {
  res.render('logreg', { title: 'Вход/Регистрация', error: null });
});

router.post('/logreg', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      // Создаем нового пользователя
      const newUser = new User({ username, password });
      await newUser.save();
      req.session.user = { id: newUser._id, username: newUser.username };
      return res.redirect('/');
    }

    // Если пользователь найден, проверяем пароль
    if (!user.checkPassword(password)) {
      return res.render('logreg', {
        title: 'Вход/Регистрация',
        error: 'Пароль неверный. Попробуйте снова.',
      });
    }

    // Если пароль верный
    req.session.user = { id: user._id, username: user.username };
    res.redirect('/');
  } catch (err) {
    console.error('Ошибка при обработке логики пользователя:', err.message);
    res.render('logreg', {
      title: 'Вход/Регистрация',
      error: 'Произошла ошибка. Попробуйте снова.',
    });
  }
});



// GET страница входа
router.get('/login', (req, res) => {
  res.render('login', { title: 'Вход', errorMessage: null });
});

// POST обработчик для входа
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !user.checkPassword(password)) {
      return res.render('login', {
        title: 'Вход',
        errorMessage: 'Неправильное имя пользователя или пароль.',
      });
    }

    // Сохраняем данные пользователя в сессию
    req.session.user = { id: user._id, username: user.username };
    res.redirect('/');
  } catch (err) {
    console.error('Ошибка при входе:', err.message);
    res.render('login', {
      title: 'Вход',
      errorMessage: 'Произошла ошибка. Попробуйте снова.',
    });
  }
});





/* POST логика для входа и регистрации */
// POST обработчик для входа
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !user.checkPassword(password)) {
      return res.render('login', {
        title: 'Вход',
        errorMessage: 'Неправильное имя пользователя или пароль.',
      });
    }

    req.session.user = { id: user._id, username: user.username };

    // Рендер главной страницы с данными пользователя
    res.render('index', {
      title: 'Добро пожаловать на Design Project',
      user: req.session.user,
      designs: [], // Передать список дизайнов, если есть
      views: req.session.views || 0, // Счетчик просмотров
    });
  } catch (err) {
    console.error('Ошибка при входе:', err.message);
    res.render('login', {
      title: 'Вход',
      errorMessage: 'Произошла ошибка. Попробуйте снова.',
    });
  }
});



/* GET страница регистрации */
router.get('/register', (req, res) => {
  res.render('register', { title: 'Регистрация', errorMessage: null });
});

/* POST запрос для регистрации */
// POST запрос для регистрации
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
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

    // Сохраняем данные пользователя в сессии
    req.session.user = { id: newUser._id, username: newUser.username };

    // Рендер главной страницы сразу с данными нового пользователя
    res.render('index', {
      title: 'Добро пожаловать на Design Project',
      user: req.session.user, // Передаем данные пользователя
      designs: [], // Список дизайнов
      views: req.session.views || 0, // Счетчик просмотров
    });
  } catch (err) {
    console.error('Ошибка при регистрации:', err.message);
    res.render('register', {
      title: 'Регистрация',
      errorMessage: 'Произошла ошибка. Попробуйте снова.',
    });
  }
});






// Обработчик для выхода из системы
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Ошибка выхода:', err);
      return res.status(500).send('Не удалось выйти из системы.');
    }
    res.clearCookie('connect.sid'); // Удаляем cookie
    res.redirect('/'); // Перенаправляем на главную страницу
  });
});



/* GET страница со списком всех дизайнов (только для авторизованных пользователей) */
router.get('/designs', checkAuth, async (req, res) => {
  try {
    const designs = await Design.find(); // Получить все дизайны
    res.render('designs', { 
      title: 'Список всех дизайнов', 
      designs,
      searchQuery: '',
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
router.post('/add', checkAuth, async (req, res) => {
  try {
    const { title, picture, desc } = req.body;
    const newDesign = new Design({ title, picture, desc });
    await newDesign.save();
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

/* GET страницы дизайнов по названию (title) */
router.get('/:designTitle', async function (req, res, next) {
  try {
    const design = await Design.findOne({ title: req.params.designTitle });
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

router.get('/design/:designId', async (req, res, next) => {
  try {
    const designId = req.params.designId; // Извлечение параметра из URL
    const design = await Design.findById(designId); // Поиск дизайна по ID

    if (!design) {
      // Если дизайн не найден, вернуть 404
      return res.status(404).send('Дизайн не найден');
    }

    // Рендер страницы дизайна
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
