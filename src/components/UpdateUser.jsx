import { useHistory, useParams } from 'react-router-dom';
import Input from './UI/Input';
import Button from './UI/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import css from './UpdateUser.module.css';
import { toast } from 'react-hot-toast';

const formFields = [
    {name: 'name', placeholder: 'Jūsų vardas', type: 'text'},
    {name: 'age', placeholder: 'Jūsų amžius', type: 'text'},
    {name: 'email', placeholder: 'Jūsų elektroninis paštas', type: 'text'},
    // {name: 'password', placeholder: 'Jūsų senas slaptažodis', type: 'password'},
    {name: 'newPassword', placeholder: 'Jūsų naujas slaptažodis', type: 'password'},
    {name: 'repeatPassword', placeholder: 'Pakartokite slaptažodį', type: 'password'},
];

const initInputs = {
    name: '',
    age: '',
    email: '',
    password: '',
    newPassword: '',
    repeatPassword: '',
};

const UpdateUser = () => {
    const history = useHistory();
    const {userId} = useParams();
    const [singleUserData, setSingleUserData] = useState({});

    useEffect(() => {
        singleUser();
        return () => {
            setSingleUserData([]);
        };
    }, []);

    async function singleUser() {
        const resp = await fetch(`http://localhost:7000/api/users/?id=${userId}`);
        const data = await resp.json();
        setSingleUserData(data);
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            ...initInputs,
            ...singleUserData,
        },
        validationSchema: Yup.object({
            name: Yup.string().min(3).max(30),
            age: Yup.string().max(3),
            email: Yup.string().email(),
            newPassword: Yup.string().min(5),
            repeatPassword: Yup.string()
                .min(5, 'minimum 4 characters')
                .oneOf([Yup.ref('newPassword'), ''], 'Password should match'),
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
        if (data.message === 'Success') {
            toast.success('Updated successfully');
        }
    }

    return (
        <div className={css.updateFormContainer}>
            <form onSubmit={formik.handleSubmit}>
                {formFields.map(({type, name, placeholder}) => (
                    <Input
                        key={name}
                        value={formik.values[name]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name={name}
                        placeholder={placeholder}
                        error={formik.touched[name] && formik.errors[name]}
                        type={type}
                    />
                ))}
                <Button type={'submit'}>Pateikti</Button>
                <Button type={'button'} onClick={() => history.goBack()}>Grįžti</Button>
            </form>
        </div>
    );
};

export default UpdateUser;
