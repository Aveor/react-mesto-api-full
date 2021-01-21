const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getAllCards, createCard, deleteCard, addLike, deleteLike,
} = require('../controllers/cards');

const cardRouter = express.Router();

cardRouter.get('/', getAllCards);

cardRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().max(20).min(2).required(),
    link: Joi.string().required(),
  }),
}), createCard);

cardRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required(),
  }),
}), deleteCard);

cardRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required(),
  }),
}), addLike);

cardRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required(),
  }),
}), deleteLike);

module.exports = cardRouter;

// const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
// const {
//   getCards, createCard, deleteCard, addLike, deleteLike,
// } = require('../controllers/cards');

// router.get('/', getCards);

// router.post('/', celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().max(20).min(2).required(),
//     link: Joi.string().required(),
//   }),
// }), createCard);

// router.delete('/:cardId', celebrate({
//   params: Joi.object().keys({
//     cardId: Joi.string().required(),
//   }),
// }), deleteCard);

// router.put('/:cardId/likes', celebrate({
//   params: Joi.object().keys({
//     cardId: Joi.string().required(),
//   }),
// }), addLike);

// router.delete('/:cardId/likes', celebrate({
//   params: Joi.object().keys({
//     cardId: Joi.string().required(),
//   }),
// }), deleteLike);

// module.exports = router;
