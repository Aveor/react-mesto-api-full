import React from 'react';
import { Link, Route } from 'react-router-dom';
import headerLogo from "../images/logo.svg";

function Header({onSignOut, userData}) {
    return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="logo" lang="en" />
      
        <Route path="/sign-up">
            <Link className="header__list-link" to="/sign-in">Войти</Link>
          </Route>
          
          <Route path="/sign-in">
            <Link className="header__list-link" to="/sign-up">Регистрация</Link>
          </Route>

          <Route exact path='/'>
          <nav className="header__nav">
          <ul className="header__list header__list_main">
            <li className="header__list-item">{userData ? userData.email : ""}</li>
            <Link onClick={onSignOut} className="header__list-link" to=''>
              Выйти
        </Link>
          </ul>
        </nav>
          </Route>
        
    </header>
    );
}

export default Header;


