import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {

  const [name, setName] = React.useState('');

  const [about, setAbout] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, props.isOpen]);

  const handleOnChangeName = (e) => {
    setName(e.target.value);
  }

  const handleOnChangeAbout = (e) => {
    setAbout(e.target.value);
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      type="profile-edit"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onOverlayClick={props.onOverlayClick}
      onSubmit={handleOnSubmit}
    >
      <div className="popup__input-container">
        <input type="text" name="profileUserName" className="popup__input popup__input_author_name" placeholder="Имя" required minLength="2" maxLength="40" value={name} onChange={handleOnChangeName} />
        <span className="popup__text-error"></span>
      </div>
      <div className="popup__input-container">
        <input type="text" name="profileUserAbout" className="popup__input popup__input_author_about" placeholder="О себе" required minLength="2" maxLength="200" value={about} onChange={handleOnChangeAbout} />
        <span className="popup__text-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
