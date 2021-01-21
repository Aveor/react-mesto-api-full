import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../context/CurrentUserContext';

function EditAvatarPopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  function handleCurrentAvatar() {
    avatarRef.current.focus();
  }

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [currentUser]);

  return (
    <PopupWithForm name="form_avatar" formName="avatar" title='Обновить аватар' submit='Создать' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} >
      <input className="popup__input popup__input_type_avatar" id="avatar-input" type="url" required
        placeholder="Ссылка на аватар" name="link" onChange={handleCurrentAvatar} ref={avatarRef} />
      <span className="popup__input-error" id="avatar-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;