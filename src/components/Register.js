import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as auth from '../auth.js';

function Register({ loggedIn }) {
  const [data, setData] = useState({
    email: '',
    password: '',
    error: ''
  })

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(data);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  }
  if(loggedIn) {
    return <Redirect to="./"/>
  }
  return(
    <div className="auth">
      <h1 className="auth__title">Регистрация</h1>
      <form onSubmit={handleSubmit} className="auth__form">
        <input className="auth__input" required name="email" type="email" value={data.username} onChange={handleChange} placeholder="Email" />
        <input className="auth__input" required name="password" type="password" value={data.password} onChange={handleChange} placeholder="Пароль" />
        <button type="submit" onSubmit={handleSubmit} className="auth__button">Зарегистрироваться</button>
      </form>
      <p className="auth__text">Уже зарегистрированы? <Link to="/sign-in" className="auth__link">Войти</Link></p>
    </div>
  )
}
export default Register;
