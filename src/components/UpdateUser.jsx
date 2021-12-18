import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Input from './UI/Input';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const formFields = [
    { name: 'name', placeholder: 'Your name' },
    { name: 'age', placeholder: 'Your age' },
    { name: 'email', placeholder: 'Your email' },
    { name: 'password', placeholder: 'Your password' },
];

const UpdateUser = () => {
    const { userId } = useParams();
    console.log(userId.toString());
    const [singleUser, setSingleUser] = useState({});

    const initInputs = {
        name: '',
        age: '',
        email: '',
        password: '',
    };

    const initInputs1 = {
        name: singleUser.name,
        age: '12',
        email: 'email@email.com',
        password: '123456',
    };

    useEffect(() => {
        async function getSingleUser() {
            const resp = await fetch(`http://localhost:7000/api/users?id=${userId}`);
            const data = await resp.json();
            setSingleUser(data);
            console.log(data);
        }
        getSingleUser();
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
            age: '',
            email: '',
            password: '',
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string().min(3).max(30),
            age: Yup.string().max(3),
            email: Yup.string().email(),
            password: Yup.string().min(5),
        }),
        onSubmit: (values) => {
            handleUpdate(values);
        },
    });

    async function handleUpdate(values) {
        const resp = await fetch(`http://localhost:7000/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });
        const data = await resp.json();
        console.log(data);
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                {formFields.map(({name, placeHolder}) => (
                    <Input
                        key={name}
                        value={formik.values[name]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name={name}
                        placeholder={placeHolder}
                        error={formik.touched[name] && formik.errors[name]}
                    />
                ))}
                <button type={'submit'}>submit</button>
            </form>

        </div>
    );
};

export default UpdateUser;
