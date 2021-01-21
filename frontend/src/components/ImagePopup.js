import React from 'react';

function ImagePopup(props) {
  return (
    <section className={(props.isOpen ? "popup popup_opened" : "popup")} >
      <div className="view">
        <button onClick={props.onClose} className="popup__button-close popup__button-close_view" id="view-close" type="reset"></button>
        <div className="view__item">
          <img src={props.card.link} className="view__image" alt={props.card.name} />
          <p className="view__caption">{props.card.name}</p>
        </div>
      </div>
    </section>
  );
}

export default ImagePopup;