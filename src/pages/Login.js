import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ history }) => {
    const navigate = useNavigate();
    const [isInvalid,setIsInvalid] = useState(false);

    const validationSchema = yup.object({
        email: yup.string().email('Invalid email format').required('Email is required'),
        password: yup.string().required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post('https://batman-assessment.fusebox-prod.co.za/api/v1/login', values);
                const authToken = response.data.data.api_access_token;
                localStorage.setItem('authToken', authToken);
                navigate('/Home');
            } catch (error) {
                setIsInvalid(true);
            }
        },
    });

    return (
        <Container style={{ marginTop: 50, alignItems: "center" }} component="main" maxWidth="xs">
            <div>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <form onSubmit={formik.handleSubmit} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary">
                        Sign In
                    </Button>
                    {
                        isInvalid &&
                        <Typography component="p" fontSize={16} color={"red"} variant="h5">
                            invalid username or password
                        </Typography>
                    }
            
                </form>
            </div>
        </Container>
    );
};

export default Login;
