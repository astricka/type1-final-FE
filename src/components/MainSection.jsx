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
    }

    return (
        <div className={css.mainSectionContainer}>
            <table>
                <thead>
                    <tr className={css.tableHeader}>
                        <th>Vardas</th>
                        <th>Amžius</th>
                        <th>Elektroninis paštas</th>
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
                        userId={item._id}
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default MainSection;
