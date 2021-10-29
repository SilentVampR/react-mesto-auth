import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup(props) {

  const handleOnSubmit = (e) => {
    e.preventDefault();
    props.onCardDelete(props.deleteId.cardId);
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
    </PopupWithForm>
  );
}

export default DeleteCardPopup;
