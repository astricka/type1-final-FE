import React from 'react';
import { useFormik } from 'formik';
import { postFetch } from '../utils/fetch';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import Input from './UI/Input';
import { toast } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import Button from './UI/Button';

const formFields = [
    { name: 'name', placeholder: 'Jūsų vardas' },
    { name: 'age', placeholder: 'Jūsų amžius' },
    { name: 'email', placeholder: 'Jūsų elektroninis paštas' },
    { name: 'password', placeholder: 'Jūsų slaptažodis' },
];

const initInputs = {
    name: "dwayyne the rock johson",
    age: "11",
    email: "aaaaaa@b.com",
    password: "aaa@.bbb.com",
};

const AddUser = () => {
    const history = useHistory();
    const [response, setResponse] = useState([]);
    const [formSentSuccess, setFormSentSuccess] = useState(false);

    useEffect(() => {
        const errorObj = responseToError(response);
        formik.setErrors(errorObj);
        return () => {
             return errorObj;
        }
    }, []);

    const formik = useFormik({
        initialValues: { ...initInputs },
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
            setFormSentSuccess(true);
        }
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
                <Button type={'submit'}>Submit</Button>
            </form>
            <Button onClick={() => history.goBack()}>Go back</Button>
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
