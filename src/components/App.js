import React, {useEffect, useState} from 'react';
import api from '../utils/api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './addPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';

function App() {

  /* STATES */

  const [currentUser, setCurentUser] = useState({name: '', about : ''});

  const [cards, setCards] = useState([]);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

  const [deleteId, setDeleteId] = useState({cardId:''});

  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({name:'', link: ''});

  const [isFormSended, setIsFormSended] = useState(false);

  /* USER INFO */

  useEffect(() => {
    api.getUserInfo()
    .then(res => setCurentUser(res))
    .catch(err => {
      console.log(err);
    });
  }, []);

  /* CARDS */

  useEffect(() => {
    api.getInitialCards()
    .then(res => setCards(res))
    .catch(err => {
      console.log(err);
    });
  }, [])

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  const handleDeleteCard = (id) => {
    api.removeCard(id)
      .then(() => {
        setCards(cards => cards.filter((state) => state._id !== id))
        })
      .catch(err => console.log(err));
    closeAllPopups();
  }

  /* END CARDS */

  /* AVATAR */

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
    setIsFormSended(false);
  }

  const handleUpdateAvatar = (url) => {
    api.editAvatar(url)
      .then(res => setCurentUser(res))
      .then(() => closeAllPopups())
      .then(() => setIsFormSended(true))
      .catch(err => console.log(err));
  }

  /* END AVATAR*/

  /* PROFILE */

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);

  }

  const handleUpdateUser = (data) => {
    api.editUserInfo(data)
      .then(res => setCurentUser(res))
      .then(() => closeAllPopups())
      .catch(err => console.log(err));
  }

  /* END PROFILE */

  /* ADD PLACE */

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
    setIsFormSended(false);
  }

  const handleAddPlace = (data) => {
    api.addNewPlace(data)
      .then(res => setCards([res, ...cards]))
      .then(() => closeAllPopups())
      .then(() => setIsFormSended(true))
      .catch(err => console.log(err));
  }

  /* END ADD PLACE */

  /* CONFIRM */

  const handleDeleteClick = (id) => {
    setIsConfirmPopupOpen(true);
    setDeleteId({cardId: id})
  }

  /* END CONFIRM */

  /* IMAGE POPUP */

  const handleCardClick = (item) => {
    setIsImagePopupOpen(true);
    setSelectedCard({name: item.name, link: item.link});
  }

  /* END IMAGE POPUP */

  /* ALL POPUPS */

  const handleOverlayClick = (e) => {
    if(e.target === e.currentTarget){
      closeAllPopups();
    }
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({name:'', link: ''});
    setIsConfirmPopupOpen(false);
    setIsImagePopupOpen(false);
  }

  /* END ALL POPUPS */


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        cards={cards}
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onDeleteClick={handleDeleteClick}
        onCardLike={handleCardLike}
        onCardDelete={handleDeleteCard}
      />
      <Footer />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onOverlayClick={handleOverlayClick}
        onUpdateAvatar={handleUpdateAvatar}
        isSended={isFormSended}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onOverlayClick={handleOverlayClick}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onOverlayClick={handleOverlayClick}
        onAddPlace={handleAddPlace}
        isSended={isFormSended}
      />
      <DeleteCardPopup
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
        onOverlayClick={handleOverlayClick}
        onCardDelete={handleDeleteCard}
        deleteId={deleteId}
      />
      <ImagePopup
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
        card={selectedCard}
        onOverlayClick={handleOverlayClick}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
