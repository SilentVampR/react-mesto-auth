import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

function Header({userData, loggedIn}) {

  const [linkProps, setLinkProps] = useState({
    path : '/sign-in',
    linkName : 'Войти'
  })

  /*const history = useHistory();
  const [locationChanged, setLocationChanged] = useState(false);

  // useEffect(()=>{
  //   console.log('Что-то изменилось')
  // }, [history]);

  history.listen(() => {
    setLocationChanged(true);
  });

  const currentPath = history.location.pathname;
  if(locationChanged){
    if(loggedIn){
      setLinkProps({
        ...linkProps,
        linkName: 'Выйти',
        path: '/sign-out'
      })
    } else {
      if(currentPath === '/sign-in') {
        setLinkProps({
          ...linkProps,
          linkName: 'Зарегистрироваться',
          path: '/sign-up'
        })
      }
    }
    setLocationChanged(false);
  }*/

  return (
    <header className="header">
      <div className="logo"></div>
      <div className="header__nav">
        <span className="header__user-info">{loggedIn ? userData.name : ''}</span>
        <Link to={linkProps.path} className={`header__nav-link${loggedIn ? ' header__nav-link_type_logout' : ''}`}>{linkProps.linkName}</Link>
      </div>
    </header>
  );
}

export default Header;
