import React from 'react';
import Button from './UI/Button';
import Icon from './UI/Icon';
import { NavLink } from 'react-router-dom';
import css from './TableItems.module.css';

const TableItems = ({ id, name, age, email, handleDelete, userId }) => {
    return (
            <tr className={css.tableItemsContainer} key={id}>
                <td>{name}</td>
                <td>{age}</td>
                <td className={css.iconContainer}>{email}
                    <div className={css.iconContainer}>
                        <Button className={css.links} type={'button'} onClick={(e) => handleDelete(id)}><Icon name={'fa-trash'} /></Button>
                        <NavLink className={css.links} to={`/updateUser/${userId}`}><Icon name={'fa-pencil'} /></NavLink>
                    </div>
                </td>

            </tr>
    );
};

export default TableItems;
