import React from 'react';
import { CurrentUserContext } from "../context/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const cardImgStyle = {
    backgroundImage: 'url(' + props.card.link + ')',
  };
  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = (
    `elements__delete ${isOwn ? 'elements__delete_visible' : 'elements__delete_hidden'}`
  );

  const isLiked = props.card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (
    `like__button ${isLiked ? 'like__button_type_active' : ''}`
  );

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <div key={props.card._id} className="elements__item">
      <div onClick={handleClick} className="elements__image" style={cardImgStyle} />
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
      <div className="elements__description">
        <h2 className="elements__title">{props.card.name}</h2>
        <div className="like">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
          {props.card.likes.length > 0 &&
            <p className="like__sum">
              {props.card.likes.length}
            </p>
          }
        </div>
      </div>
    </div>
  );
}

export default Card;