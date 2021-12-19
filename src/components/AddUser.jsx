import React from 'react';
import { useFormik } from 'formik';
import { postFetch } from '../utils/fetch';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import Input from './UI/Input';
import { toast } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import Button from './UI/Button';
import css from './AddUser.module.css';

const formFields = [
    { name: 'name', placeholder: 'Jūsų vardas', type: 'text' },
    { name: 'age', placeholder: 'Jūsų amžius', type: 'text' },
    { name: 'email', placeholder: 'Jūsų elektroninis paštas', type: 'text' },
    { name: 'password', placeholder: 'Jūsų slaptažodis', type: 'password' },
];

const initInputs = {
    name: "",
    age: "",
    email: "",
    password: "",
};

const AddUser = () => {
    const history = useHistory();
    const [response, setResponse] = useState([]);
    // const [formSentSuccess, setFormSentSuccess] = useState(false);

    useEffect(() => {
        const errorObj = responseToError(response);
        formik.setErrors(errorObj);
        return () => {
             return errorObj;
        }
    }, []);

    const formik = useFormik({
        initialValues: { ...initInputs },
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string().min(3).max(30).required(),
            age: Yup.string().max(3).required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(5).required(),
        }),
        onSubmit: (values) => {
            postFetchForm(values);
        },
    });

    async function postFetchForm(values) {
        const data = await postFetch(values);

        if (data.error) {
            setResponse(data.error);
            toast.error('Please check the form');
        }
        if (data.message) {
            toast.success(data.message);
            // setFormSentSuccess(true);
        }
    }

    return (
        <div className={css.addUserContainer}>
            <form onSubmit={formik.handleSubmit}>
                {formFields.map(({type,name, placeholder}) => (
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
                <Button type={'submit'}>Submit</Button>
                <Button type={'button'} onClick={() => history.goBack()}>Go back</Button>
            </form>
        </div>
    );
};

export default AddUser;

function responseToError(response) {
    const arrayStructure = response.map((errObj) => ({
        [errObj.field]: errObj.errorMsg,
    }));
    return Object.assign({}, ...arrayStructure);
}
