import React from 'react';
import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup(props) {

  function handleSubmit(e) {
    e.preventDefault();
    props.onDelete()
  }

  return (
    <PopupWithForm name="form_confirmation" buttonSaveName="confirm" formName="confirm" title='Вы уверены?' submit='Да' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} isLoading={props.isLoading} />
  );
}

export default ConfirmationPopup;