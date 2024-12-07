var mongoose = require("mongoose");
var { User } = require("./models/User");

mongoose.connect("mongodb://localhost/design_project", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function testUserModel() {
  try {
    // Создание нового пользователя
    const user = new User({
      username: "testuser",
      password: "securepassword",
    });

    await user.save();

    console.log("Пользователь успешно сохранён:");
    console.log(user);

    // Проверка хэширования пароля
    const isPasswordCorrect =
      user.hashedPassword === user.encryptPassword("securepassword");
    console.log("Пароль корректен:", isPasswordCorrect);

    mongoose.connection.close();
  } catch (err) {
    console.error("Ошибка работы с моделью User:", err.message);
    mongoose.connection.close();
  }
}

testUserModel();
