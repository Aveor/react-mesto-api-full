const express = require('express');
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const cardRouter = express.Router();

const {
  getAllCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike,
} = require('../controllers/cards');

cardRouter.get('/', auth, getAllCards);
cardRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().max(20).min(2).required(),
    link: Joi.string().required().pattern(/https?:\/\/(www\.)?[\w-]+(\.[a-z]+)[\w-._~:/?#@!$&'()*+,;=%]*#?/),
  }),
}), auth, createCard);
cardRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().required().length(24)
      .hex(),
  }),
}), auth, deleteCard);
cardRouter.put('/likes/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().required().length(24)
      .hex(),
  }),
}), auth, addLike);
cardRouter.delete('/likes/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().required().length(24)
      .hex(),
  }),
}), auth, deleteLike);

module.exports = cardRouter;
