import React from 'react';
import css from './Input.module.css';

const Input = ({type, error, ...rest }) => {
    return (
        <div>
            <input
                {...rest}
                type={type}
            />
            {error && <span className={css.inputError}>{error}</span>}
        </div>
    );
};

export default Input;
