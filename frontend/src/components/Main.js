import React from 'react';
import Card from "./Card.js";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <img className="profile__avatar" src={currentUser.avatar} alt={currentUser.name} name="avatar" />
        <div onClick={props.onEditAvatar} className="profile__img-edit"></div>
        <div className="profile__container">
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__description">{currentUser.about}</p>
          </div>
          <button onClick={props.onEditProfile} className="profile__edit-button" type="button" ></button>
        </div>
        <button onClick={props.onAddPlace} className="profile__add-button" type="button" ></button>
      </section>

      <section className="elements">{props.cards && props.cards.map((card) => (
        <Card key={card._id} card={card} onCardClick={props.clickImages} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
      ))}</section>
    </main>
  );
}

export default Main;