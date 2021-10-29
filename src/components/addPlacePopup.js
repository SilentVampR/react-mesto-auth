import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    if (props.isSended === true) {
      setName('');
      setLink('');
    }
  }, [props.isSended]);

  const handleOnChangeName = (e) => {
    setName(e.target.value);
  }

  const handleOnChangeLink = (e) => {
    setLink(e.target.value);
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      type="new-place"
      buttonText="Добавить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onOverlayClick={props.onOverlayClick}
      onSubmit={handleOnSubmit}
    >
      <div className="popup__input-container">
        <input type="text" name="placeName" className="popup__input popup__input_place_name" placeholder="Название" required minLength="2" maxLength="30" value={name} onChange={handleOnChangeName} />
        <span className="popup__text-error"></span>
      </div>
      <div className="popup__input-container">
        <input type="url" name="placeUrl" className="popup__input popup__input_place_url" placeholder="Ссылка на изображение" required value={link} onChange={handleOnChangeLink} />
        <span className="popup__text-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
