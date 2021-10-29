import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

  const avatarUrlInput = React.useRef();

  React.useEffect(() => {
    if (props.isSended === true) {
      avatarUrlInput.current.value = ''
    }
  }, [props.isSended]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    props.onUpdateAvatar(avatarUrlInput.current.value);
  }

  return (
    <PopupWithForm
      title="Редактировать аватар"
      type="avatar-edit"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onOverlayClick={props.onOverlayClick}
      onSubmit={handleOnSubmit}
    >
      <div className="popup__input-container">
        <input type="url" name="avatarUrl" className="popup__input popup__avatar-url" placeholder="Ссылка на изображение" ref={avatarUrlInput} required />
        <span className="popup__text-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
