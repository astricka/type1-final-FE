import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './Header.module.css'

const Header = () => {
    return (
        <div className={css.headerContainer}>
            <img className={css.logo} src="usersTransparent.png" alt="logo"/>
            <nav className={css.linksContainer}>
                <NavLink className={css.linkStyled} to={'/addUser'}>Pridėti vartotoją</NavLink>
                <NavLink className={css.linkStyled} to={'/'}>Pagrindinis puslapis</NavLink>
            </nav>
        </div>
    );
};

export default Header;
