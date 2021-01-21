import React from "react";
import union from "../images/union.svg";
import icon from "../images/icon.svg";

function InfoTooltip(props) {
  const { isOpen, onClose, successStyle } = props;
  const errorImg = {
    backgroundImage: "url(" + union + ")",
  };
  const successImg = {
    backgroundImage: "url(" + icon + ")",
  };

  return (
    <section
      className={isOpen ? "popup popup_opened" : "popup"}
      id="InfoTooltip"
    >
      <form className="popup__container popup__container_type_login">
        <button
          onClick={onClose}
          className="popup__button-close popup__button-close_login"
          id="formError-close"
          type="button"
        />
        <div
          className="popup__img"
          style={successStyle ? successImg : errorImg}
        />
        <h2 className="popup__title popup__title_type_login">
          {successStyle
            ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </form>
    </section>
  );
}

export default InfoTooltip;
