const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params._id)
    .orFail()
    .catch(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const getOneUser = (req, res, next) => {
  User.findById(req.user)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      } return res.status(200).send(user);
    })
    .catch((error) => {
      if (error.kind === 'ObjectId') {
        throw new ValidationError('Нет корректного id');
      }
      next(error);
    });
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .catch((err) => {
      if (err.name === 'MongoError' || err.code === 11000) {
        throw new ConflictError({ message: 'Пользователь с таким email уже зарегистрирован' });
      } else next(err);
    })
    .then((user) => res.status(201).send({
      data: {
        name: user.name,
        about: user.about,
        avatar,
        email: user.email,
      },
    }))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    {
      avatar,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new Error('NotValidId'))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        throw new NotFoundError({ message: 'Пользователь не найден' });
      }
      throw new ValidationError({ message: 'Запрос некорректен' });
    })
    .then((updatedAvatar) => res.send(updatedAvatar))
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new Error('NotValidId'))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        throw new NotFoundError({ message: 'Пользователь не найден' });
      }
      throw new ValidationError({ message: 'Запрос некорректен' });
    })
    .then((updatedUser) => res.send(updatedUser))
    .catch(next);
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  login,
  updateAvatar,
  updateProfile,
  getUser,
};
