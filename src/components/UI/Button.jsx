import React from 'react';
import css from './Button.module.css';

const Button = ({children, onClick, type}) => {
    return (
        <button className={css.buttonStyled} type={type} onClick={onClick}>{children}</button>
    );
};

export default Button;
