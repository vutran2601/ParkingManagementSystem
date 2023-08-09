import React, { useState, useEffect } from 'react';
import {
    Typography,
    Grid,
    TextField,
    FormControl,
    Radio,
    FormControlLabel,
    FormLabel,
    RadioGroup,
    Button,
    MenuItem,
    Select,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    Checkbox,
    Box,
    Alert,
    CircularProgress,
} from '@mui/material';
import axios from 'axios';

const tableTitle = [
    'Vehicle ID',
    'Type',
    'Check in',
    'Check out',
    'Fuel',
    'Change oil',
    'Washing',
    'Total cost',
];

const CheckIn = (props) => {
    const [formInfo, setFormInfo] = useState({
        vehicleid: '',
        type: '',
    });

    const handleCheckIn = async (formSubmit) => {
        await axios.patch('https://parking-management-system-backend.vercel.app/vehicle/checkin', {
            vehicleid: formSubmit.vehicleid,
            type: formSubmit.type,
        });
    };

    const handleClick = async () => {
        const valueEmpty = Object.values(formInfo).some((value) => value === '');
        if (valueEmpty) {
            props.setAlert('error');
            setTimeout(() => props.setAlert(''), 2000);
        } else {
            await handleCheckIn(formInfo);
            props.setAlert('success');
            setTimeout(() => props.setAlert(''), 2000);
            props.setServiceSelect('');
        }
    }

    return (
        <Grid sx={{ mt: 3, p: 3, borderRadius: 2, backgroundColor: 'white' }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>
                Vehicle check-in
            </Typography>
            <Grid sx={{ my: 2 }}>
                <FormLabel>Vehicle ID</FormLabel>
                <TextField
                    name="vehicleid"
                    fullWidth
                    sx={{ mt: 1 }}
                    value={formInfo.vehicleid}
                    required
                    onChange={(event) =>
                        setFormInfo({
                            ...formInfo,
                            vehicleid: event.target.value,
                        })
                    }
                />
            </Grid>
            <Grid sx={{ mt: 2 }}>
                <FormLabel>Type</FormLabel>
                <RadioGroup
                    value={formInfo.type}
                    required
                    onChange={(event) =>
                        setFormInfo({ ...formInfo, type: event.target.value })
                    }
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <FormControlLabel
                        value="4 seater"
                        control={<Radio />}
                        label="4 seater"
                    />
                    <FormControlLabel
                        value="7 seater"
                        control={<Radio />}
                        label="7 seater"
                    />
                    <FormControlLabel
                        value="Truck"
                        control={<Radio />}
                        label="Truck"
                    />
                </RadioGroup>
            </Grid>
            <Grid sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleClick()}
                >
                    <Typography sx={{ textTransform: 'none' }}>
                        Confirm
                    </Typography>
                </Button>
            </Grid>
        </Grid>
    );
};

const CheckOut = (props) => {
    const [vehicleid, setVehicleId] = useState('');

    const handleCheckOut = async (vehicleid_req) => {
        try {
            const response = await axios.patch('https://parking-management-system-backend.vercel.app/vehicle/checkout', {
                vehicleid: vehicleid_req
            });
            return response.status
        } catch (err) {
            return err.response.status
        } 
    };

    const handleClick = async () => {  
        const checkOutStatus = await handleCheckOut(vehicleid);
        console.log(checkOutStatus)  
        if (vehicleid === '' || [400, 500].includes(checkOutStatus)) {
            props.setAlert('error');
            setTimeout(() => props.setAlert(''), 2000);
        } else {
            props.setAlert('success');
            setTimeout(() => props.setAlert(''), 2000);
            props.setServiceSelect('');
        }
    }

    return (
        <Grid sx={{ mt: 3, p: 3, borderRadius: 2, backgroundColor: 'white' }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>
                Vehicle check-out
            </Typography>
            <Grid sx={{ my: 2 }}>
                <FormLabel>Vehicle ID</FormLabel>
                <TextField
                    value={vehicleid}
                    onChange={(event) => setVehicleId(event.target.value)}
                    name="vehicleid"
                    fullWidth
                    sx={{ mt: 1 }}
                />
            </Grid>
            <Grid sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleClick()}
                >
                    <Typography sx={{ textTransform: 'none' }}>
                        Confirm
                    </Typography>
                </Button>
            </Grid>
        </Grid>
    );
};

const FuelCharge = (props) => {
    const [formInfo, setFormInfo] = useState({
        vehicleid: '',
        fuel: {
            type: '',
            amount: '',
        },
    });

    const handleFuelCharge = async (formSubmit) => {
        await axios.patch('https://parking-management-system-backend.vercel.app/vehicle/fuelcharge', {
            vehicleid: formSubmit.vehicleid,
            fuel: formSubmit.fuel,
        });
    };

    const handleClick = async () => {
        const valueEmpty = formInfo.vehicleid === '' || formInfo.fuel.type === '' || formInfo.fuel.amount === '';
        if (valueEmpty) {
            props.setAlert('error');
            setTimeout(() => props.setAlert(''), 2000);
        } else {
            await handleFuelCharge(formInfo);
            props.setAlert('success');
            setTimeout(() => props.setAlert(''), 2000);
            props.setServiceSelect('');
        }
    }

    return (
        <Grid sx={{ mt: 3, p: 3, borderRadius: 2, backgroundColor: 'white' }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>
                Fuel charge
            </Typography>
            <Grid sx={{ my: 2 }}>
                <FormLabel>Vehicle ID</FormLabel>
                <TextField
                    value={formInfo.vehicleid}
                    onChange={(event) =>
                        setFormInfo({
                            ...formInfo,
                            vehicleid: event.target.value,
                        })
                    }
                    name="vehicleid"
                    fullWidth
                    sx={{ mt: 1 }}
                />
            </Grid>
            <Grid sx={{ my: 2 }}>
                <FormLabel>Type</FormLabel>
                <RadioGroup
                    name="type"
                    value={formInfo.fuel.type}
                    onChange={(event) =>
                        setFormInfo({
                            ...formInfo,
                            fuel: {
                                ...formInfo.fuel,
                                type: event.target.value,
                            },
                        })
                    }
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '70%',
                    }}
                >
                    <FormControlLabel
                        value="Gasoline"
                        control={<Radio />}
                        label="Gasoline"
                    />
                    <FormControlLabel
                        value="Diesel"
                        control={<Radio />}
                        label="Diesel"
                    />
                </RadioGroup>
            </Grid>
            <Grid sx={{ my: 2 }}>
                <FormLabel>Amount (gallon)</FormLabel>
                <TextField
                    value={formInfo.fuel.amount}
                    onChange={(event) =>
                        setFormInfo({
                            ...formInfo,
                            fuel: {
                                ...formInfo.fuel,
                                amount: event.target.value,
                            },
                        })
                    }
                    name="vehicleid"
                    fullWidth
                    sx={{ mt: 1 }}
                />
            </Grid>
            <Grid sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleClick()}
                >
                    <Typography sx={{ textTransform: 'none' }}>
                        Confirm
                    </Typography>
                </Button>
            </Grid>
        </Grid>
    );
};

const ChangeOil = (props) => {
    const [vehicleid, setVehicleId] = useState('');

    const handleChangeOil = async (vehicleid_req) => {
        await axios.patch('https://parking-management-system-backend.vercel.app/vehicle/changeoil', {
            vehicleid: vehicleid_req,
        });
    };

    const handleClick = async () => {
        if (vehicleid === '') {
            props.setAlert('error');
            setTimeout(() => props.setAlert(''), 2000);
        } else {
            await handleChangeOil(vehicleid);
            props.setAlert('success');
            setTimeout(() => props.setAlert(''), 2000);
            props.setServiceSelect('');
        }
    }

    return (
        <Grid sx={{ mt: 3, p: 3, borderRadius: 2, backgroundColor: 'white' }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>
                Change oil
            </Typography>
            <Grid sx={{ my: 2 }}>
                <FormLabel>Vehicle ID</FormLabel>
                <TextField
                    value={vehicleid}
                    onChange={(event) => setVehicleId(event.target.value)}
                    name="vehicleid"
                    fullWidth
                    sx={{ mt: 1 }}
                />
            </Grid>
            <Grid sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleClick()}
                >
                    <Typography sx={{ textTransform: 'none' }}>
                        Confirm
                    </Typography>
                </Button>
            </Grid>
        </Grid>
    );
};

const Washing = (props) => {
    const [vehicleid, setVehicleId] = useState('');

    const handleWashing = async (vehicleid_req) => {
        await axios.patch('https://parking-management-system-backend.vercel.app/vehicle/washing', {
            vehicleid: vehicleid_req,
        });
    };

    const handleClick = async () => {
        if (vehicleid === '') {
            props.setAlert('error');
            setTimeout(() => props.setAlert(''), 2000);
        } else {
            await handleWashing(vehicleid);
            props.setAlert('success');
            setTimeout(() => props.setAlert(''), 2000);
            props.setServiceSelect('');
        }
    }

    return (
        <Grid sx={{ mt: 3, p: 3, borderRadius: 2, backgroundColor: 'white' }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>
                Washing
            </Typography>
            <Grid sx={{ my: 2 }}>
                <FormLabel>Vehicle ID</FormLabel>
                <TextField
                    value={vehicleid}
                    onChange={(event) => setVehicleId(event.target.value)}
                    name="vehicleid"
                    fullWidth
                    sx={{ mt: 1 }}
                />
            </Grid>
            <Grid sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleClick()}
                >
                    <Typography sx={{ textTransform: 'none' }}>
                        Confirm
                    </Typography>
                </Button>
            </Grid>
        </Grid>
    );
};

const MonitoringTable = (props) => {
    return (
        <Grid
            sx={{
                m: 4,
                p: 3,
                borderRadius: 2,
                backgroundColor: 'white',
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '30px',
            }}
        >
            {/* Statistic title */}
            <Typography
                variant="h5"
                sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                }}
            >
                Vehicle Monitoring
            </Typography>

            {/* Search vehicle */}
            <TextField
                placeholder="Search by vehicle ID..."
                onChange={async (event) => {
                    props.setLoading(true);
                    const response = await axios.get(
                        'https://parking-management-system-backend.vercel.app/vehicle/search',
                        {
                            params: {
                                keyword: event.target.value,
                            },
                        }
                    );
                    props.setVehicleRecords(response.data);
                    setTimeout(() => props.setLoading(false), 500);
                }}
                sx={{
                    width: '250px',
                }}
            />

            {/* Table */}
            <TableContainer
                sx={{
                    maxHeight: '380px',
                    pr: '10px',
                    minHeight: '100px',
                }}
            >
                <Table stickyHeader>
                    {/* Table head */}
                    <TableHead>
                        <TableRow>
                            {tableTitle.map((title, index) => {
                                return (
                                    <TableCell
                                        key={index}
                                        sx={{
                                            fontWeight: 'bold',
                                            p: '0px 0px 10px 0px',
                                            textAlign: ['Change oil',
                                                'Washing',
                                            ].includes(title)
                                                ? 'center'
                                                : '' || title === 'Total cost'
                                                ? 'right'
                                                : '',
                                            width: '12.5%'
                                        }}
                                    >
                                        {title}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>

                    {/* Table body */}
                    <TableBody sx={{ position: 'relative' }} >
                        {
                            props.loading ? <CircularProgress sx={{ position: 'absolute', top: '15px', left: '50%' }}/> :
                            props.vehicleRecords.map((vehicle, index) => {
                                const checkin = vehicle.checkin ? new Date(vehicle.checkin).toLocaleString('en-GB', { timeZone: 'Asia/Ho_Chi_Minh', hour12: false } ) : undefined;
                                const checkout = vehicle.checkout ? new Date(vehicle.checkout).toLocaleString('en-GB', { timeZone: 'Asia/Ho_Chi_Minh', hour12: false } ) : undefined;
                                return (
                                    <TableRow
                                        hover
                                        key={index}
                                        sx={{
                                            cursor: 'pointer',
                                            '& > td': {
                                                p: '10px 0px'
                                            },
                                            '&:hover': {
                                                backgroundColor: '#cce6ff !important'
                                            }
                                        }}
                                    >
                                        {/* Vehicle ID */}
                                        <TableCell sx={{ fontWeight: 'bold' }}>{vehicle.vehicleid}</TableCell>

                                        {/* Type */}
                                        <TableCell>{vehicle.type}</TableCell>

                                        {/* Check in */}
                                        <TableCell>
                                            {checkin?.slice(0, checkin?.indexOf(','))} <br/> 
                                            {checkin?.slice(checkin?.indexOf(' '))}
                                        </TableCell>

                                        {/* Check out */}
                                        <TableCell>
                                            {checkout?.slice(0, checkin?.indexOf(','))} <br/> 
                                            {checkout?.slice(checkin?.indexOf(' '))}
                                        </TableCell>

                                        {/* Fuel */}
                                        <TableCell>
                                            {vehicle.fuel?.type} <br/>
                                            <b>{vehicle.fuel?.amount}</b> {vehicle.fuel?.type ? '(gallon)' : ''}
                                        </TableCell>

                                        {/* Change oil */}
                                        <TableCell>
                                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                {
                                                    vehicle.changeoil ? 
                                                    <Checkbox disabled checked sx={{ '&.Mui-disabled': {
                                                        color: '#1976D2',
                                                      }, }} /> :
                                                    <Checkbox disabled/>
                                                }
                                            </Box>
                                        </TableCell>

                                        {/* Washing */}
                                        <TableCell>
                                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                {
                                                    vehicle.washing ? 
                                                    <Checkbox disabled checked sx={{ '&.Mui-disabled': {
                                                        color: '#1976D2',
                                                      }, }} /> :
                                                    <Checkbox disabled/>
                                                }
                                            </Box>
                                        </TableCell>

                                        {/* Cost */}
                                        <TableCell>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                                                <b>{vehicle.cost === undefined ? '' : '$ ' + vehicle.cost}</b>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
};

export default function Page() {
    const [alert, setAlert] = useState('');
    const [loading, setLoading] = useState(false);
    const [serviceSelect, setServiceSelect] = useState('');
    const [vehicleRecords, setVehicleRecords] = useState([]);
    const FetchVehicleRecords = async () => {
        const response = await axios.get(
            'https://parking-management-system-backend.vercel.app/vehicle/getall'
        );
        setVehicleRecords(response.data);
    };

    useEffect(() => {
        FetchVehicleRecords();
    }, []);

    useEffect(() => {
        if (alert === 'success') {
            setLoading(true);
            FetchVehicleRecords();
            setTimeout(() => setLoading(false), 500);
        }
    }, [alert]);

    return (
        <Grid container sx={{ position: 'relative' }}>
            {alert === 'success' && (
                <Alert
                    severity="success"
                    sx={{
                        position: 'absolute',
                        top: '10px',
                        left: '42%',
                        border: '1px solid #388e3c',
                    }}
                >
                    Successfully updated
                </Alert>
            )}
            {alert === 'error' && (
                <Alert
                    severity="error"
                    sx={{
                        position: 'absolute',
                        top: '10px',
                        left: '42%',
                        border: '1px solid #d32f2f',
                    }}
                >
                    Something went wrong
                </Alert>
            )}
            <Grid item xs={4}>
                <Grid sx={{ m: 4 }}>
                    <Grid
                        sx={{ p: 3, borderRadius: 2, backgroundColor: 'white' }}
                    >
                        <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>
                            Vehicle services
                        </Typography>
                        <Grid sx={{ my: 3 }}>
                            <FormControl fullWidth>
                                <FormLabel>Select type of service</FormLabel>
                                <Select
                                    sx={{ mt: 1 }}
                                    value={serviceSelect}
                                    onChange={(event) =>
                                        setServiceSelect(event.target.value)
                                    }
                                >
                                    <MenuItem value="checkin">
                                        Vehicle check-in
                                    </MenuItem>
                                    <MenuItem value="checkout">
                                        Vehicle check-out
                                    </MenuItem>
                                    <MenuItem value="fuelcharge">
                                        Fuel charge
                                    </MenuItem>
                                    <MenuItem value="changeoil">
                                        Change oil
                                    </MenuItem>
                                    <MenuItem value="washing">Washing</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    {serviceSelect === 'checkin' && (
                        <CheckIn
                            setServiceSelect={setServiceSelect}
                            setAlert={setAlert}
                        />
                    )}
                    {serviceSelect === 'checkout' && (
                        <CheckOut
                            setServiceSelect={setServiceSelect}
                            setAlert={setAlert}
                        />
                    )}
                    {serviceSelect === 'fuelcharge' && (
                        <FuelCharge
                            setServiceSelect={setServiceSelect}
                            setAlert={setAlert}
                        />
                    )}
                    {serviceSelect === 'changeoil' && (
                        <ChangeOil
                            setServiceSelect={setServiceSelect}
                            setAlert={setAlert}
                        />
                    )}
                    {serviceSelect === 'washing' && (
                        <Washing
                            setServiceSelect={setServiceSelect}
                            setAlert={setAlert}
                        />
                    )}
                </Grid>
            </Grid>
            <Grid item xs={8}>
                <MonitoringTable
                    vehicleRecords={vehicleRecords}
                    setVehicleRecords={setVehicleRecords}
                    loading={loading}
                    setLoading={setLoading}
                />
            </Grid>
        </Grid>
    );
}
