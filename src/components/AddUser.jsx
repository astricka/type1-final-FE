import React from 'react';
import { useFormik } from 'formik';
import { postFetch } from '../utils/fetch';

const initInputs = {
    name: 'Dwayne The Rock Johnson',
    age: '44',
    email: 'email@email.com',
    password: '123456',
};

const AddUser = () => {

    const formik = useFormik({
        initialValues: { ...initInputs },
        validationSchema: Yup.object({
            name: Yup.string().min(3).max(30).required(),
            age: Yup.number()
                .max(100)
                .required,
            email: Yup.string().email().required(),
            password: Yup.string().min(5).required,
        }),
        onSubmit: (values) => {
            postFetch(values);
        },
    });

    return (
        <div>

        </div>
    );
};

export default AddUser;
