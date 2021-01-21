import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link,
    });

  }

  return (
    <PopupWithForm name="form_card" title='Новое место' submit='Создать' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} >
      <input className="popup__input popup__input_type_place" id="place-input" type="text" value={name || ''} required
        placeholder="Название" name="name" minLength="1" maxLength="30" onChange={handleChangeName} />
      <span className="popup__input-error" id="place-input-error"></span>
      <input className="popup__input popup__input_type_link" id="link-input" type="url" required
        placeholder="Ссылка на картинку" name="link" value={link || ''} onChange={handleChangeLink} />
      <span className="popup__input-error" id="link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;