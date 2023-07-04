import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Grid,
        Box,
        Link,
        Checkbox,
        Container,
        FormControlLabel,
        Typography}
    from '@mui/material';
import {SmartHomeImage,
        Field,
        AuthButton,
        Title,
        DirectPage,}
    from '../components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const AltOption = () => {
    return (
        <Grid container sx={{alignItems: 'center'}}>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" sx={{'& .MuiSvgIcon-root': {color: '#6C63FF'}}}/>}
                    label="Ghi nhớ"
                    sx={{ '& .MuiFormControlLabel-label': { fontWeight: 'bold', fontSize: 14 }, textAlign: 'left' }}/>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link href="#" sx={{ color: '#6C63FF', fontSize: 14 }}>
                    Quên mật khẩu?
                </Link>
            </Grid>
        </Grid>
    )
}

export default function Page() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email('Email không hợp lệ')
                .required('Email không được để trống'),
            password: Yup
                .string()
                .min(6, 'Mật khẩu phải tối thiểu 6 ký tự')
                .required('Mật khẩu không được để trống'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://localhost:5000/auth/login', {
                    email: values.email,
                    password: values.password,
                });
                localStorage.setItem('accessToken', response.data.accessToken);
                navigate('/dashboard');
            } catch (error) {
                console.error(error);
                error.response.data.message === 'Account is not exist' ?
                    setErrorMessage('Tài khoản không tồn tại') : 
                    setErrorMessage('Mật khẩu không chính xác');
            }
            
        },
    });
    useEffect(() => {setErrorMessage(null)}, [formik.values.email, formik.values.password]);
    return (
        <Grid
            container={true} spacing={2}
            sx={{
                alignItems: 'center',
                px: 16,
            }}>
            <Grid item sm={6}>
                <SmartHomeImage/>
            </Grid>
            <Grid item sm={6}>
                <Container component="main" maxWidth="xs">
                    <Box sx={{
                            mt: 10,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                        <Title/>
                        <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                            <Field type='email' label='Địa chỉ Email' formik={formik}/>
                            <Field type='password' label='Mật khẩu' formik={formik}/>
                            <AltOption/>
                            {errorMessage && <Typography color="error" variant="caption">{errorMessage}</Typography>}
                            <AuthButton type='login'/>
                            <DirectPage page='login'/>
                        </Box>
                    </Box>
                </Container>
            </Grid>
        </Grid>
    )
}