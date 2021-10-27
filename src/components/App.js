import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
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
import ProtectedRoute from './ProtectedRote';
import ProtectedComponent from './ProtectedComponent';
import Login from './Login';
import Register from './Register';

function App() {

  /* STATES */
  const [loggedIn, setloggedIn] = useState(false);
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

  /* USER INFO + CARDS */
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, initialCards]) => {
      setCurentUser(userData);
      setCards(initialCards)
    })
    .catch(err => console.log(`Ошибка загрузки данных: ${err}`))
  }, []);
  /*useEffect(() => {
    api.getUserInfo()
    .then(res => setCurentUser(res))
    .catch(err => {
      console.log(err);
    });
  }, []);

  /* CARDS */

  /*useEffect(() => {
    api.getInitialCards()
    .then(res => setCards(res))
    .catch(err => {
      console.log(err);
    });
  }, [])*/

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
  console.log(loggedIn);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header loggedIn={loggedIn}/>
      <main className="content">
        <Switch>
          <ProtectedRoute
            component={Main}
            path="/"
            exact
            loggedIn={loggedIn}
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onDeleteClick={handleDeleteClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCard}
          >
          </ProtectedRoute>
          <Route path="/sign-in" exact>
            <Login loggedIn={loggedIn} />
          </Route>
          <Route path="/sign-up"exact>
            <Register loggedIn={loggedIn}/>
          </Route>
        </Switch>
        </main>
        <Footer />
        <ProtectedComponent
          component={EditAvatarPopup}
          loggedIn={loggedIn}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClick}
          onUpdateAvatar={handleUpdateAvatar}
          isSended={isFormSended}
        />
        <ProtectedComponent
          component={EditProfilePopup}
          loggedIn={loggedIn}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClick}
          onUpdateUser={handleUpdateUser}
        />
        <ProtectedComponent
          component={AddPlacePopup}
          isOpen={isAddPlacePopupOpen}
          loggedIn={loggedIn}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClick}
          onAddPlace={handleAddPlace}
          isSended={isFormSended}
        />
        <ProtectedComponent
          component={DeleteCardPopup}
          loggedIn={loggedIn}
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClick}
          onCardDelete={handleDeleteCard}
          deleteId={deleteId}
        />
        <ProtectedComponent
          component={ImagePopup}
          loggedIn={loggedIn}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
          onOverlayClick={handleOverlayClick}
        />
    </CurrentUserContext.Provider>
  );
}

export default App;
