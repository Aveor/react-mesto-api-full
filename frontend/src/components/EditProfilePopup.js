import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../context/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser])

  return (
    <PopupWithForm name="form_profile" title='Редактировать профиль' submit='Сохранить'
      isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input className="popup__input popup__input_type_name" id="name-input" type="text" required
        placeholder="Имя" value={name || ''}
        name="name" minLength="2" maxLength="40" onChange={handleChangeName} />
      <span className="popup__input-error" id="name-input-error"></span>
      <input className="popup__input popup__input_type_job" id="job-input" type="text" required
        placeholder="О себе" value={description || ''}
        name="about" minLength="2" maxLength="200" onChange={handleChangeDescription} />
      <span className="popup__input-error" id="job-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;