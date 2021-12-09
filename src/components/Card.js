import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const handleImageClick = (item) => {
    props.onCardClick(item);
  }

  const handleDeleteClick = (id) => {
    props.onDeleteClick(id);
  }

  const card = props.card;

  const countLikes = card.likes.length;

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const likeButtonClassName = `card__like-button${isLiked ? ' card__like-button_active' : ''}`

  const isOwn = card.owner._id || card.owner === currentUser._id;

  const cardDeleteButtonClassName = (
    `card__delete-button${isOwn ? ' card__delete-button_active' : ''}`
  );
  return (
    <div className="card">
      <img src={card.link} alt={card.name} className="card__image" onClick={() => handleImageClick(card)} />
      <button className={cardDeleteButtonClassName} type="button" onClick={() => handleDeleteClick(card._id)}></button>
      <div className="card__footer">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button className={likeButtonClassName} type="button" onClick={() => {props.onCardLike(card)}}></button>
          <p className="card__like-counter">{countLikes}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
