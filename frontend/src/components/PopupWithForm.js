import React from 'react';

function PopupWithForm(props) {
  return (
    <section className={(props.isOpen ? "popup popup_opened" : "popup")} id={props.name}>
      <form className={`popup__container popup__container_type_${props.formName}`} name={props.name} method="post" action="#" onSubmit={props.onSubmit}>
        <button onClick={props.onClose} className="popup__button-close" type="reset"></button>
        <h3 className="popup__title">{props.title}</h3>
        {props.children}
        <button className={(!props.disabled ? `popup__button-save popup__button-save_type_${props.buttonSaveName}` : "popup__button-save popup__button-save_type_disabled")} type="submit" disabled={props.disabled}>
          {props.submit}
        </button>
      </form>
    </section>
  );
}

export default PopupWithForm;