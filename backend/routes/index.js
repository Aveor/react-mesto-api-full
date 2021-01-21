const express = require('express');

const router = express.Router();

const userRouter = require('./users.js');
const cardRouter = require('./cards.js');
const NotFoundError = require('../errors/NotFoundError');

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use('/*', (req, res, next) => {
  const error = new NotFoundError('Запрашиваемый ресурс не найден');
  next(error);
});

module.exports = router;
