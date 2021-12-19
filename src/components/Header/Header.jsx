import React from 'react';
import { NavLink } from 'react-router-dom';
import css from '../MainSection.module.css';

const Header = () => {
    return (
        <div>
            <nav>
                <NavLink className={css.linkStyled} to={'/addUser'}>Add user</NavLink>
                <NavLink to={'/'}></NavLink>
            </nav>
        </div>
    );
};

export default Header;
