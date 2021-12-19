import React from 'react';
import css from './Icon.module.css';

const Icon = ({name}) => {
    return (
        <i className={`fa ${name}`}/>
    );
};

export default Icon;
