import React, { useState, useEffect } from 'react';
import { getFetchData } from '../utils/fetch';
import { toast } from 'react-hot-toast';
import css from './MainSection.module.css';
import TableItems from './TableItems';

const MainSection = () => {
    const [data, setData] = useState([]);

    async function fetchData() {
        const data = await getFetchData();
        setData(data);
    }

    let isMounted = true;

    useEffect(() => {
        fetchData();
        return () => {
            setData([]);
        };
    }, []);

    async function handleDelete(_id) {
        const resp = await fetch(`http://localhost:7000/api/users/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const deleteData = await resp.json();

        if (deleteData.message === 'User was deleted successfully!') {
            await fetchData();
        }

        toast.success(deleteData.message);
        console.log(deleteData);
    }

    return (
        <div className={css.mainSectionContainer}>
            <table>
                <thead>
                    <tr className={css.tableHeader}>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((item) => (
                    <TableItems
                        key={item._id}
                        name={item.name}
                        age={item.age}
                        email={item.email}
                        handleDelete={(e) => handleDelete(item._id)}
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default MainSection;
