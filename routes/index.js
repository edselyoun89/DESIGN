var express = require('express');
var router = express.Router();

/* GET страницы дизайнов. */
router.get('/MinDesign', function(req, res, next) {
  res.render('design', {
    title: "Минималистичный Дизайн",
    picture: "/images/minDesign.jpg",
    desc: "Минималистичный дизайн характеризуется простотой, чистотой и функциональностью."
  });
});

router.get('/ModDesign', function(req, res, next) {
  res.render('design', {
    title: "Модерн Дизайн",
    picture: "/images/modernDesign.jpg",
    desc: "Модерн дизайн подчеркивает современные элементы, яркие цвета и инновационные формы."
  });
});

router.get('/RetroDesign', function(req, res, next) {
  res.render('design', {
    title: "Ретро Дизайн",
    picture: "/images/retroDesign.jpg",
    desc: "Ретро дизайн сочетает в себе элементы из прошлого и уникальную атмосферу ностальгии."
  });
});

module.exports = router;
