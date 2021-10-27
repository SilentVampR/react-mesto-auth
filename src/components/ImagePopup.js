function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image-overlay${props.isOpen ? ' popup_opened' : ''}`} onClick={props.onOverlayClick}>
    <figure className="popup__image-container">
      <img src={props.card.link} alt={props.card.name} className="popup__image" />
      <button className="popup__close-button" type="button" onClick={props.onClose}></button>
      <figcaption className="popup__image-caption">{props.card.name}</figcaption>
    </figure>
  </div>
  );
}

export default ImagePopup;
