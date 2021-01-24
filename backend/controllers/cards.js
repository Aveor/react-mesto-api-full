const Card = require('../models/cards');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const AuthError = require('../errors/AuthError');

const getAllCards = (req, res, next) => {
  Card.find({})
    .orFail(new AuthError('Необходимо авторизоваться'))
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  return Card.create({ name, link, owner: req.user.id })
    .then((card) => {
      if (!card) {
        throw new ValidationError('Ошибка валидации');
      }
      res.status(200).send(card);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById({ _id: req.params.cardId })
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      if (card.owner.toString() !== req.user.id) {
        throw new ForbiddenError('Нет прав');
      }
      card.remove()
        .then(() => res.status(200).send({ message: 'Карточка удалена!' }));
    })
    .catch(next);
};

const addLike = (req, res, next) => {
  const id = req.params.cardId;
  Card.findByIdAndUpdate(id, { $addToSet: { likes: req.user.id } }, { new: true })
    .orFail(new NotFoundError('Такой карточки с таким id нет'))
    .then((data) => {
      res.send((data));
    })
    .catch(next);
};

const deleteLike = (req, res, next) => {
  const id = req.params.cardId;
  Card.findByIdAndUpdate(id, { $pull: { likes: req.user.id } }, { new: true })
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
