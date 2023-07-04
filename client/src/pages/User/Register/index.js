import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Grid,
        Box,
        Typography,
        Link,
        Checkbox,
        Container,
        FormControlLabel,
        FormHelperText,
        Alert,
        Modal,
        IconButton }
    from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {SmartHomeImage,
        Field,
        AuthButton,
        Title,
        DirectPage,}
    from '../components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const PolicyCheckbox = ({formik}) => {
    return (
        <Grid container sx={{ alignItems: 'center'}}>
            <FormControlLabel
                control={
                    <Checkbox 
                        checked={formik.values.policy} 
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange} 
                        name="policy"  
                        sx={{'& .MuiSvgIcon-root': {color: '#6C63FF'}}}/>}
                label={
                    <Typography variant="body1" sx={{ fontWeight: 'bold' , fontSize: 14}}>
                    Tôi đã đọc và đồng ý với <Link href="#" underline="always" sx={{ color: '#6C63FF' }}>điều khoản và điều kiện</Link>
                    </Typography>
                }/>
            {formik.touched.policy && formik.errors.policy ? (
                <FormHelperText sx={{color: '#d32f2f'}}>{formik.errors.policy}</FormHelperText>
            ) : null}
        </Grid>
    )
}

export default function Page() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            policy: false
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
            confirmPassword: Yup
                .string()
                .oneOf([Yup.ref('password'), null], 'Xác nhận mật khẩu phải trùng khớp')
                .required('Xác nhận mật khẩu không được để trống'),
            policy: Yup
                .boolean()
                .oneOf([true], 'Bạn phải đồng ý với điều khoản và điều kiện để tiếp tục sử dụng')
        }),
        onSubmit: async (values) => {
            try {
                await axios.post('http://localhost:5000/auth/register', {
                    email: values.email,
                    password: values.password,
                    confirmPassword: values.confirmPassword,
                });
                setShowModal(true);
            } catch (error) {
                console.error(error);
                if (error.response.data.message === 'Account is already exist') setErrorMessage('Tài khoản đã tồn tại');
            }
        },
    });
    useEffect(() => {setErrorMessage(null)}, 
                    [formik.values.email, formik.values.password, formik.values.confirmPassword, formik.values.policy]);    
    return (
        <>
            <Modal
                open={showModal}
                onClose={() => setShowModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <Box sx={{width: '400px',
                        maxWidth: '80vw',
                        position: 'fixed',
                        top: '7%',
                        bgcolor: 'white',
                        
                        borderRadius: '50px',
                        border: 'none'}}>
                    <Alert
                        severity="success"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    navigate('/login');
                                }}>
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{
                            borderRadius: 5
                        }}>
                        <strong>Đăng ký thành công!</strong>
                        <br/>
                        Bạn có thể đăng nhập để tiếp tục sử dụng              
                    </Alert>
                </Box>
            </Modal>
            <Grid container="true" spacing={2}
                sx={{
                    alignItems: 'center',
                    px: 16,
                }}>
                <Grid item lg={6} sx={{ mb: 12 }}>
                    <SmartHomeImage/>
                </Grid>
                <Grid item lg={6}>
                    <Container component="main" maxWidth="xs">
                        <Box
                            sx={{
                                mt: 10,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}>
                            <Title/>
                            <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                                <Field type="email" label="Địa chỉ email" formik={formik}/>
                                <Field type='password' label='Mật khẩu' formik={formik}/>
                                <Field type='confirmPassword' label='Xác nhận mật khẩu' formik={formik}/>
                                <PolicyCheckbox formik={formik}/>
                                {errorMessage && <Typography color="error" variant="caption">{errorMessage}</Typography>}
                                <AuthButton type='register'/>
                                <DirectPage page='register'/>
                            </Box>
                        </Box>
                    </Container>
                </Grid>
            </Grid>
        </>
    )
}