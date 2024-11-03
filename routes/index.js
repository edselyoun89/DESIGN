var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/MinDesign', function(req, res, next) {
  res.send("<h1>Страница Минималистичного Дизайна</h1>")
});

router.get('/ModDesign', function(req, res, next) {
  res.send("<h1>Страница Модерн Дизайна</h1>")
});

router.get('/MinDesign', function(req, res, next) {
  res.send("<h1>Страница Ретро Дизайна</h1>")
});

module.exports = router;
