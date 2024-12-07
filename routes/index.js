var express = require('express');
var router = express.Router();
const Design = require('../models/Design'); // Подключение модели Design

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    const designs = await Design.find(); // Получить все дизайны из базы данных
    res.render('index', { 
      title: 'Добро пожаловать на Design Project', 
      designs // Передача данных о дизайнах в шаблон
    });
  } catch (err) {
    console.error('Ошибка загрузки дизайнов:', err.message);
    res.status(500).send('Ошибка загрузки данных');
  }
});

/* GET страница добавления дизайна */
router.get('/add', function (req, res, next) {
  res.render('add', { title: 'Добавить новый дизайн' });
});

/* POST запрос для добавления нового дизайна */
router.post('/add', async function (req, res, next) {
  try {
    const { title, picture, desc } = req.body;
    const newDesign = new Design({ title, picture, desc });
    await newDesign.save(); // Сохранение нового дизайна в базе
    res.redirect('/'); // Перенаправление на главную страницу после добавления
  } catch (err) {
    console.error('Ошибка добавления дизайна:', err.message);
    res.status(500).send('Ошибка добавления дизайна');
  }
});

/* GET запрос для поиска дизайнов */
router.get('/search', async function (req, res, next) {
  try {
    const query = req.query.q; // Получить строку поиска из параметров запроса
    const designs = await Design.find({
      title: { $regex: query, $options: 'i' } // Регистронезависимый поиск по названию
    });

    // Если результаты поиска пусты
    if (designs.length === 0) {
      return res.render('index', { 
        title: 'Результаты поиска', 
        designs: [], 
        message: 'Дизайны не найдены' 
      });
    }

    // Отобразить найденные дизайны
    res.render('index', { 
      title: 'Результаты поиска', 
      designs 
    });
  } catch (err) {
    console.error('Ошибка поиска дизайнов:', err.message);
    res.status(500).send('Ошибка поиска');
  }
});

/* GET страница редактирования дизайна */
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
    await Design.findByIdAndUpdate(req.params.id, { title, picture, desc }); // Обновить данные в базе
    res.redirect('/'); // Перенаправление на главную страницу
  } catch (err) {
    console.error('Ошибка обновления дизайна:', err.message);
    res.status(500).send('Ошибка обновления данных');
  }
});

/* GET запрос для удаления дизайна */
router.get('/delete/:id', async function (req, res, next) {
  try {
    await Design.findByIdAndDelete(req.params.id); // Удалить дизайн по ID
    res.redirect('/'); // Перенаправление на главную страницу
  } catch (err) {
    console.error('Ошибка удаления дизайна:', err.message);
    res.status(500).send('Ошибка удаления данных');
  }
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
      desc: design.desc
    });
  } catch (err) {
    console.error('Ошибка загрузки дизайна:', err.message);
    res.status(500).send('Ошибка загрузки данных');
  }
});

module.exports = router;

