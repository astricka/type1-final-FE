import React, { useState, useEffect } from 'react';
import { getFetchData } from '../utils/fetch';
import { toast } from 'react-hot-toast';

const MainSection = () => {
    const [data, setData] = useState([]);

    async function fetchData() {
        const data = await getFetchData();
        setData(data);
    }

    useEffect( () => {


        fetchData();
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
        <div>
            <ul>
                {data.map((item) => (
                    <li key={item._id}>{item.name}{item.age}{item.email}{item.password}<button type={'button'} onClick={(e) => handleDelete(item._id)}>Del</button></li>
                ))}
            </ul>
        </div>
    );
};

export default MainSection;
