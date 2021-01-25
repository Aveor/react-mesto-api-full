const express = require('express');
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getAllUsers,
  getUser,
  getOneUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

const userRouter = express.Router();

userRouter.get('/', auth, getAllUsers);
userRouter.get('/me', auth, getOneUser);
userRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().required().length(24)
      .hex(),
  }),
}), getUser);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().max(20).min(2),
    about: Joi.string().required().max(20).min(2),
  }),
}), auth, updateProfile);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/^((http|https):\/\/)(www\.)?([\w\W\d]{1,})(\.)([a-zA-Z]{1,10})([\w\W\d]{1,})?$/),
  }),
}), auth, updateAvatar);

module.exports = userRouter;
