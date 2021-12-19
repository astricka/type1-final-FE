import React from 'react';
import css from './Button.module.css';

const Button = ({children, onClick, type, className}) => {
    return (
        <button className={className} type={type} className={css.buttonStyled} onClick={onClick}>{children}</button>
    );
};

export default Button;
