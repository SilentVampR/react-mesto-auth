import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup(props) {

  const cardIdInput = React.useRef();

  const handleOnChange = () => {

  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    props.onCardDelete(cardIdInput.current.value);
    cardIdInput.current.value = '';
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      type="confirm"
      buttonText="Да"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onOverlayClick={props.onOverlayClick}
      onSubmit={handleOnSubmit}
    >
      <input type="text" name="placeId" value={props.deleteId.cardId} className="popup__input popup__input_place_id" ref={cardIdInput} onChange={handleOnChange} hidden />
    </PopupWithForm>
  );
}

export default DeleteCardPopup;
