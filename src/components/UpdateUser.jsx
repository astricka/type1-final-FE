import { useHistory, useParams } from 'react-router-dom';
import Input from './UI/Input';
import Button from './UI/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';

const formFields = [
    { name: 'name', placeholder: 'Jūsų vardas' },
    { name: 'age', placeholder: 'Jūsų amžius' },
    { name: 'email', placeholder: 'Jūsų elektroninis paštas' },
    { name: 'password', placeholder: 'Jūsų slaptažodis' },
];

const UpdateUser = () => {
    const history = useHistory();
    const { userId } = useParams();
    console.log(userId.toString());

    const initInputs = {
        name: '',
        age: '',
        email: '',
        password: '',
    };

    const formik = useFormik({
        initialValues: {
            ...initInputs
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
                {formFields.map(({name, placeholder}) => (
                    <Input
                        key={name}
                        value={formik.values[name]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name={name}
                        placeholder={placeholder}
                        error={formik.touched[name] && formik.errors[name]}
                    />
                ))}
                <Button type={'subit'}>Submit</Button>
            </form>
            <Button onClick={() => history.goBack()}>Go back</Button>
        </div>
    );
};

export default UpdateUser;
