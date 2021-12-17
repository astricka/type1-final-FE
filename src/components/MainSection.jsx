import React, { useState, useEffect } from 'react';
import { getFetchData } from '../utils/fetch';

const MainSection = () => {
    const [data, setData] = useState([]);

    useEffect( () => {
        async function fetchData() {
            const data = await getFetchData();
            setData(data);
        }
        fetchData();
    }, []);

    return (
        <div>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.name} {item.age} {item.email} {item.password}</li>
                ))}
            </ul>
        </div>
    );
};

export default MainSection;
