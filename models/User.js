const mongoose = require('mongoose');
const crypto = require('crypto');

// Схема пользователя
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

// Виртуальное поле для пароля
userSchema.virtual('password')
  .set(function (password) {
    this._plainPassword = password;
    this.salt = Math.random().toString(); // Генерация соли
    this.hashedPassword = this.encryptPassword(password); // Хэшируем пароль
  })
  .get(function () {
    return this._plainPassword;
  });

// Метод для шифрования пароля
userSchema.methods.encryptPassword = function (password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

// Метод для проверки пароля
userSchema.methods.checkPassword = function (password) {
    const isMatch = this.encryptPassword(password) === this.hashedPassword;
    console.log('Проверка пароля:', isMatch); // Лог для отладки
    return isMatch;
  };
  

// Экспорт модели User
module.exports = mongoose.model('User', userSchema);
