import React from "react";
import { Link } from "react-router-dom";

function Header({userData, loggedIn}) {
const path='/logout'
const linkName='Выйти'
  return (
    <header className="header">
      <div className="logo"></div>
      <div className="header__nav">
        <span className="header__user-info">{userData.name}</span>
        <Link to={path} className={`header__nav-link${loggedIn && ' header__nav-link_type_logout'}`}>{linkName}</Link>
      </div>
    </header>
  );
}

export default Header;
