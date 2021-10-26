import React from 'react';
import { Link } from 'react-router-dom';
import * as auth from '../auth.js';

function Register() {
  return(
    <div className="login">
      <p className="login__welcome">
        Добро пожаловать!
      </p>
      <form onSubmit={this.handleSubmit} className="login__form">
        <label htmlFor="username">
          Логин:
        </label>
        <input required id="username" name="username" type="text" value={this.state.username} onChange={this.handleChange} />
        <label htmlFor="password">
          Пароль:
        </label>
        <input required id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange} />
        <div className="login__button-container">
          <button type="submit" onSubmit={this.handleSubmit} className="login__link">Войти</button>
        </div>
      </form>

      <div className="login__signup">
        <p>Ещё не зарегистрированы?</p>
        <Link to="/register" className="signup__link">Зарегистрироваться</Link>
      </div>
    </div>
  )
}
export default Register;
