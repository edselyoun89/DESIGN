# Design Project

## Описание проекта

**Design Project** — это современное веб-приложение, позволяющее управлять коллекцией дизайнерских проектов. Пользователи могут просматривать, добавлять, редактировать и удалять проекты. Визуальный стиль проекта выполнен в минималистичном тёмном стиле с акцентом на современный пользовательский интерфейс и анимации. Проект построен с использованием **Node.js**, **Express**, **MongoDB** и шаблонизатора **EJS**.

---

## Основной функционал

- **Аутентификация**:
  - Регистрация новых пользователей.
  - Авторизация уже существующих пользователей.
  - Выход из системы.
  - Доступ к функциональности ограничен только для авторизованных пользователей.

- **Управление дизайнами**:
  - Добавление нового дизайна (с названием, изображением и описанием).
  - Просмотр списка всех дизайнов.
  - Редактирование существующего дизайна.
  - Удаление дизайнов с подтверждением.
  - Поиск дизайнов по названию.

- **Современный дизайн**:
  - Темная цветовая схема с акцентными цветами.
  - Анимации и плавные переходы.
  - Использование пользовательских шрифтов и кнопок с эффектами.

---

## Технологии

### Back-End:
- **Node.js** — Серверная среда выполнения JavaScript.
- **Express.js** — Фреймворк для создания серверных приложений.
- **MongoDB** — База данных для хранения информации о пользователях и дизайнах.

### Front-End:
- **EJS** — Шаблонизатор для создания динамических HTML-страниц.
- **Bootstrap** — Фреймворк для стилизации и создания адаптивного дизайна.
- **AOS** (Animate on Scroll) — Для анимаций при прокрутке.

---

## Установка и запуск

### Локальный запуск:

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/edselyoun89/DESIGN.git
   ```

2. Установите зависимости:
   ```bash
   cd DESIGN
   npm install
   ```

3. Настройте MongoDB:
   - Убедитесь, что сервер MongoDB запущен локально или укажите URL для удалённой базы данных в файле `db.js`.

4. Запустите сервер:
   ```bash
   npm start
   ```

5. Откройте приложение в браузере:
   ```
   http://localhost:3000
   ```

---

## Основные маршруты

### Публичные маршруты:
- **`/`** — Главная страница.
- **`/login`** — Вход в систему.
- **`/register`** — Регистрация нового пользователя.

### Приватные маршруты:
- **`/designs`** — Просмотр всех дизайнов.
- **`/add`** — Добавление нового дизайна.
- **`/design/:designId`** — Просмотр подробностей дизайна.
- **`/edit/:designId`** — Редактирование дизайна.

---

## Как было реализовано

1. **Аутентификация**:
   - Реализована через сессии с использованием `express-session` и хранилища `connect-mongo`.

2. **Обработка ошибок**:
   - Создан файл `error.ejs` для отображения ошибок в удобном формате.

3. **Ограничение доступа**:
   - Создан middleware `checkAuth.js` для защиты страниц, доступных только авторизованным пользователям.

4. **CRUD-функциональность**:
   - Полная поддержка создания, чтения, обновления и удаления проектов с подтверждением.

5. **Современный дизайн**:
   - Темная тема, анимации и плавные переходы (с помощью AOS и CSS).

---

## Примеры использования

### Главная страница:
- Для незарегистрированного пользователя отображается предложение зарегистрироваться или войти в систему.
- После входа приветствие пользователя отображается на главной странице.

### Работа с дизайнами:
- Пользователь может добавлять, редактировать, искать и удалять дизайны. Перед удалением появляется подтверждение.

---

## Скриншоты

### Главная страница:
![Главная страница](https://drive.google.com/file/d/1LtjXYDRlyN7rVfTVHeKBvI9sEmXomkcn/view?usp=sharing)

### Страница дизайнов:
![Страница дизайнов](https://drive.google.com/file/d/17YKZmesPEBFUYXJqphnSJaoxE7BvbUWz/view?usp=sharing)

---

## Контрибьюция

Если у вас есть идеи по улучшению проекта, создавайте Pull Request или пишите мне напрямую.

---

## Лицензия

Этот проект доступен под лицензией MIT.

---

**Автор**: Design Project Team 2024 | Nikita Telichko