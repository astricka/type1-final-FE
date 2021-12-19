import React from 'react';

const Input = ({type, error, ...rest }) => {
    return (
        <div>
            <input
                {...rest}
                type={type}
            />
            {error && <span>{error}</span>}
        </div>
    );
};

export default Input;
