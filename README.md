# Diplom-api

http://mestoivanitskiy.tk/api

###### (NPM, Express.js, MongoDB, API Rest)

* npm run start - запуск
* npm run dev - запуск в режиме hot-reload 

Роуты:
* GET /users/me - возвращает информацию о пользователе (email и имя)
* GET /articles - возвращает все сохранённые пользователем статьи
* POST /articles - создаёт статью с переданными в теле ( keyword, title, text, date, source, link и image )
* DELETE /articles/articleId - удаляет сохранённую статью  по _id
* POST /signup - создаёт пользователя с переданными в теле email, password и name
* POST /signin - проверяет переданные в теле почту и пароль и возвращает JWT

--version: 1.0.0
