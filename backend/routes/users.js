const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getAllUsers,
  getOneUser,
  getUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

const userRouter = express.Router();

userRouter.get('/', getAllUsers);

userRouter.get('/me', getOneUser);

userRouter.get('/:userId', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().length(24).hex(),
  }),
}), getUser);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().max(20).min(2),
    about: Joi.string().required().max(20).min(2),
  }),
}), updateProfile);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/^((http|https):\/\/)(www\.)?([\w\W\d]{1,})(\.)([a-zA-Z]{1,10})([\w\W\d]{1,})?$/),
  }),
}), updateAvatar);

module.exports = userRouter;
