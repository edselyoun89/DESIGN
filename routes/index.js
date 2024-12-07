var express = require('express');
var router = express.Router();
const Design = require('../models/Design'); // Подключение модели Design

/* GET home page. */
router.get('/', async function(req, res, next) {
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

/* GET страницы дизайнов по названию (title). */
router.get('/:designTitle', async function(req, res, next) {
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
