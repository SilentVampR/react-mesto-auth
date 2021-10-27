import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as auth from '../auth.js';

function Login({ loggedIn }) {
  const [data, setData] = useState({
    username: '',
    password: '',
  })

  const handleSubmit = (evt) => {
    evt.preventDefault();

  }

  const handleChange = (e) => {
    //setData(e.target);
  }
  if(loggedIn) {
    return <Redirect to="./"/>
  }
  return(
    <div className="auth">
      <h1 className="auth__title">Вход</h1>
      <form onSubmit={handleSubmit} className="auth__form">
        <input className="auth__input" required name="username" type="text" value={data.username} onChange={handleChange} />
        <input className="auth__input" required name="password" type="password" value={data.password} onChange={handleChange} />
        <button type="submit" onSubmit={handleSubmit} className="auth__button">Войти</button>
      </form>
      <p className="auth__text">Ещё не зарегистрированы? <Link to="/sign-up" className="auth__link">Зарегистрироваться</Link></p>
    </div>
  )
}

export default Login;
