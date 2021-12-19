import React, { useState, useEffect } from 'react';
import { getFetchData } from '../utils/fetch';
import { toast } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import Button from './UI/Button';
import css from './MainSection.module.css';
import Icon from './UI/Icon';

const MainSection = () => {
    const [data, setData] = useState([]);

    async function fetchData() {
        const data = await getFetchData();
        setData(data);
    }

    let isMounted = true;

    useEffect( () => {
        fetchData();
        return () => {
            setData([])
        }
    }, []);

    async function handleDelete(_id) {
        const resp = await fetch(`http://localhost:7000/api/users/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const deleteData = await resp.json();

        if (deleteData.message === "User was deleted successfully!") {
            await fetchData();
        }

        toast.success(deleteData.message);
        console.log(deleteData);
    }

    return (
        <div className={css.mainSectionContainer}>
            <ul className={css.listContainer}>
                {data.map((item) => (
                    <li
                        key={item._id}>
                        {item.name}
                        {item.age}
                        {item.email}
                        <div className={css.iconsContainer}>
                            <Button type={'button'} onClick={(e) => handleDelete(item._id)}><Icon name={'fa-trash'} /></Button>
                            <NavLink className={css.linkStyled} to={`/updateUser/${item._id}`}><Icon name={'fa-pencil'} /></NavLink>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MainSection;
