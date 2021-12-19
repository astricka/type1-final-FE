import React from 'react';
import css from './Button.module.css';

const Button = ({children, onClick, type}) => {
    return (
        <button type={type} className={css.buttonStyled} onClick={onClick}>{children}</button>
    );
};

export default Button;
