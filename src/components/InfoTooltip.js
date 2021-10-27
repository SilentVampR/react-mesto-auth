function InfoTooltip(props) {
  return (
    <div className={`popup popup_type_${props.type}${props.isOpen.opened ? ' popup_opened' : ''}`} onClick={props.onOverlayClick}>
      <div className="popup__container">
        <div className={`popup__icon popup__icon_type_${props.isOpen.error ? 'error' : 'success'}`}></div>
        <p className="popup__message">{props.isOpen.message}</p>
        <button className="popup__close-button" type="button" onClick={props.onClose}></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
