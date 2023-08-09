import React, { useState, useEffect } from 'react';
import {
    Typography,
    Grid,
    TextField,
    Button,
    Box,
    FormLabel,
    Alert,
    CircularProgress,
} from '@mui/material';
import axios from 'axios';

const PriceItemField = (props) => {
    const typeInLowerCase = props.type.replace(/\s/g,'').toLowerCase()
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }} >
            <FormLabel>{props.type}</FormLabel>
            <TextField
                value={props.price[typeInLowerCase]}
                type='number'
                onChange={(event) => props.setPrice({...props.price, [typeInLowerCase]: parseFloat(event.target.value)})}
                sx={{ mt: 1, width: '180px' }}
            />
        </Box>
    );
};

export default function Page() {
    const [alert, setAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState({
        '4seater': {
            $numberDecimal: 0.0,
        },
        '7seater': {
            $numberDecimal: 0.0,
        },
        'truck': {
            $numberDecimal: 0.0,
        },
        'gasoline': {
            $numberDecimal: 0.0,
        },
        'diesel': {
            $numberDecimal: 0.0,
        },
        'changeoil': {
            $numberDecimal: 0.0,
        },
        'washing': {
            $numberDecimal: 0.0,
        },
    });

    const FetchPrice = async () => {
        const response = await axios.get('https://parking-management-system-backend-vutran2601.vercel.app/price/getall');
        setPrice(response.data[0]);
    };

    const handleChangePrice = async () => {
        await axios.patch('https://parking-management-system-backend-vutran2601.vercel.app/price/changeprice', {
            price: price,
        });
    };

    useEffect(() => {
        FetchPrice();
    }, []);

    useEffect(() => {
        if (alert) {
            setLoading(true);
            FetchPrice();
            setTimeout(() => setLoading(false), 500);
        }
    }, [alert]);

    return (
        <Grid
            sx={{
                m: 3,
                p: 3,
                borderRadius: 2,
                backgroundColor: 'white',
                width: '50%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {alert && (
                <Alert
                    severity="success"
                    sx={{
                        position: 'absolute',
                        top: '80px',
                        left: '52.5%',
                        border: '1px solid #388e3c',
                    }}
                >
                    Successfully updated
                </Alert>
            )}
            <Typography
                sx={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    alignSelf: 'flex-start',
                }}
            >
                Service management
            </Typography>
            {loading ? (
                <CircularProgress
                    sx={{
                        marginTop: '10px',
                    }}
                />
            ) : (
                <Grid sx={{ my: 2 }}>
                    <Box sx={{ mb: 3 }}>
                        <Typography>Parking price ($/day)</Typography>
                        <Box sx={{ display: 'flex', gap: '20px' }}>
                            {
                                ['4 Seater', '7 Seater', 'Truck'].map((item, index) => {
                                    return (
                                        <PriceItemField
                                            type={item}
                                            price={price}
                                            setPrice={setPrice}
                                        />
                                    )
                                })
                            }
                        </Box>
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <Typography>Fuel price ($/gallon)</Typography>
                        <Box sx={{ display: 'flex', gap: '20px' }}>
                            {
                                ['Gasoline', 'Diesel'].map((item, index) => {
                                    return (
                                        <PriceItemField
                                            type={item}
                                            price={price}
                                            setPrice={setPrice}
                                        />
                                    )
                                })
                            }
                        </Box>
                    </Box>
                    <Box>
                        <Typography>Another service ($)</Typography>
                        <Box sx={{ display: 'flex', gap: '20px' }}>
                            {
                                ['Change oil', 'Washing'].map((item, index) => {
                                    return (
                                        <PriceItemField
                                            type={item}
                                            price={price}
                                            setPrice={setPrice}
                                        />
                                    )
                                })
                            }
                        </Box>
                    </Box>
                </Grid>
            )}
            <Grid sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        handleChangePrice();
                        setAlert(true);
                        setTimeout(() => setAlert(false), 2000);
                    }}
                >
                    <Typography sx={{ textTransform: 'none' }}>
                        Confirm
                    </Typography>
                </Button>
            </Grid>
        </Grid>
    );
}
