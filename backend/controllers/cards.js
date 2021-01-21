const Card = require('../models/cards');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new ValidationError('Ошибка валидации');
      }
      next(error);
    });
};

const deleteCard = (req, res, next) => {
  const id = req.params.cardId;
  Card.findById(id)
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нет прав');
      }
      card.remove()
        .then(() => res.status(200).send({ message: 'Карточка удалена!' }));
    })
    .catch(next);
};

const addLike = (req, res, next) => {
  const id = req.params.cardId;
  Card.findByIdAndUpdate(id, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(new NotFoundError('Такой карточки с таким id нет'))
    .then((data) => {
      res.send((data));
    })
    .catch(next);
};

const deleteLike = (req, res, next) => {
  const id = req.params.cardId;
  Card.findByIdAndUpdate(id, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(new NotFoundError('Такой карточки с таким id нет'))
    .then((data) => {
      res.send((data));
    })
    .catch(next);
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike,
};
