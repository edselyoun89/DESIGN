const User = require("../models/User");

module.exports = async function (req, res, next) {
  res.locals.user = null; // Инициализация глобальной переменной user

  try {
    if (req.session.user_id) {
      const user = await User.findById(req.session.user_id);
      if (user) {
        res.locals.user = user; // Установка глобальной переменной user
      }
    }
  } catch (err) {
    console.error("Ошибка при получении пользователя:", err.message);
  }
  
  next();
};
