import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';


function Login({ loggedIn, onSignIn, onClick }) {
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  if(loggedIn) {
    return <Redirect to="./"/>
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = data;
    onSignIn({ email, password });
  }

  return(
    <div className="auth">
      <h1 className="auth__title">Вход</h1>
      <form onSubmit={handleSubmit} className="auth__form">
        <input className="auth__input" required name="email" type="email" value={data.email} onChange={handleChange} placeholder="Email" />
        <input className="auth__input" required name="password" type="password" value={data.password} onChange={handleChange} placeholder="Пароль" />
        <button type="submit" className="auth__button">Войти</button>
      </form>
      <p className="auth__text">Ещё не зарегистрированы? <Link to="/sign-up" className="auth__link" onClick={onClick}>Зарегистрироваться</Link></p>
    </div>
  )
}

export default Login;
