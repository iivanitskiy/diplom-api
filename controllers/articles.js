const mongoose = require('mongoose');
const Article = require('../models/article');
const ErrorRequest = require('../errors/errorRequest');
const ErrorMiss = require('../errors/errorMiss');
const ErrorAuth = require('../errors/errorAuth');
const ErrorValidation = require('../errors/errorValidation');

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  const owner = req.user._id;

  const articleModel = new Article({
    keyword, title, text, date, source, link, image, owner,
  });
  const validate = articleModel.validateSync();
  if (validate) {
    const errorMessage = Object.values(validate.errors)
      .map((error) => error.message);
    next(new ErrorRequest(errorMessage));
    return;
  }

  Article.create(articleModel)
    .then((article) => res.send({ data: article }))
    .catch(next);
};

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  const { articleId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(articleId)) {
    throw new ErrorValidation('Некорректный идентификатор');
  }

  Article.findById(articleId)
    .then((article) => {
      if (!article) {
        throw new ErrorMiss('Статья не найдена');
      }
      if (!article.owner.equals(req.user._id)) {
        throw new ErrorAuth('Нельзя удалять статьи других пользователей');
      }
      return true;
    })
    .then((delArticle) => {
      if (!delArticle) {
        return;
      }

      Article.findByIdAndDelete(articleId)
        .then((article) => {
          if (article === null) {
            throw new ErrorMiss('id не найден');
          }
          return res.json({ data: article });
        });
    })
    .catch(next);
};
