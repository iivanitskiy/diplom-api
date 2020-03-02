const { celebrate, Joi } = require('celebrate');
const articles = require('express').Router();
const { createArticle, getArticles, deleteArticle } = require('../controllers/articles');

articles.post('/',
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required().min(1).max(100),
      title: Joi.string().required().min(1).max(100),
      text: Joi.string().required().min(1).max(500),
      date: Joi.date().required(),
      source: Joi.string().required().min(1).max(500),
      link: Joi.string().required().min(1).max(500),
      image: Joi.string().required().min(1).max(500),
    }),
  }),
  createArticle);

articles.get('/', getArticles);

articles.delete('/:articleId',
  celebrate({
    params: Joi.object().keys({
      articleId: Joi.string().required(),
    }),
  }),
  deleteArticle);

module.exports = articles;
