import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

function Header({ userData, loggedIn, onSwitchClick, onClick, onSignOut }) {

  const [linkProps, setLinkProps] = useState({
    path: '/sign-up',
    linkName: 'Зарегистрироваться'
  })
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();
  const currentPath = history.location.pathname;

  useEffect(() => {
    if (loggedIn) {
      setUserEmail(userData.email);
      setLinkProps({
        ...linkProps,
        linkName: 'Выйти',
        path: '/sign-in'
      })
    } else {
      setUserEmail('');
      if (currentPath === '/sign-up') {
        setLinkProps({
          ...linkProps,
          linkName: 'Войти',
          path: '/sign-in'
        })
      } else {
        setLinkProps({
          ...linkProps,
          linkName: 'Зарегистрироваться',
          path: '/sign-up'
        })
      }
    }
  }, [onSwitchClick, loggedIn])

  return (
    <header className="header">
      <div className="logo"></div>
      <div className="header__nav">
        <span className="header__user-info">{userEmail}</span>
        <Link
          to={linkProps.path}
          onClick={loggedIn ? onSignOut : onClick}
          className={`header__nav-link${loggedIn ? ' header__nav-link_type_logout' : ''}`}
        >
          {linkProps.linkName}
        </Link>
      </div>
    </header>
  );
}

export default Header;
