import React, { useState, useEffect } from 'react';
import { styled } from "@mui/material/styles";
import {Grid,
        Box,
        Typography,
        Paper,
        Modal,
        IconButton,
        TextField,
        MenuItem,
        FormControl,
        InputLabel,
        Select,
        Button,
        Alert,}
    from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {CloseOutlined,}
    from "@material-ui/icons";
import LightIcon from "../../assets/images/lightIcon.png";
import FanIcon from "../../assets/images/fanIcon.png";
import SensorIcon from "../../assets/images/sensorIcon.png";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Field } from '../User/components';


const GetDevices = async () => {
    const path = window.location.pathname;
    const roomId = path.split('/')[2];
    const response = await axios.get('http://localhost:5000/api/devices', {
        params: {
            room: roomId
        }
    });
    return response.data;
}

const DeleteDevice = async (device, setShowModal, setModalOpen, setInfoModal) => {
    try {
        const path = window.location.pathname;
        const roomId = path.split('/')[2];
        setInfoModal({'type': 'delete', 'name': device.name})
        await axios.delete('http://localhost:5000/api/device', {
            data: { room: roomId, device: device.index },
        });
        setModalOpen(false);
        setShowModal(true);
    } catch (error) {
        console.error(error);
    }
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
}));

const RangeField = ({ type, device={}, formik }) => {
    return (
        <Box sx={{ width: '130px' }}>
            <Typography variant="subtitle1">
                <p style={{ margin: "0", color: 'gray', fontSize: 12}}>
                    { type === 'min' ? 'Ngưỡng thấp nhất' : 'Ngưỡng cao nhất' }
                </p>
            </Typography>
            <TextField
                required
                fullWidth
                id={type}
                name={type}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                defaultValue={ type === 'min' ? device.min : device.max }
                type='number'
                autoComplete={type}
                sx={{
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#6C63FF',
                    },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#6C63FF',
                    },
                }}
                InputProps={{
                    endAdornment: (
                        <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                            { device.type === 'temp' ? '°C' : '%' }
                        </Typography>
                    ),
                }}/>
        </Box>
    )
}

const ShowRange = ({ isAdd, sensor, device={}, formik }) => {
    if (isAdd) {
        if (sensor !== 'none' && sensor !== 'other') {
            return (
                <Box sx={{ my: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <RangeField type='min' device={{ type: sensor }} formik={formik}/>
                    <RangeField type='max' device={{ type: sensor }} formik={formik}/>
                </Box>
            )
        } else return null;
    } else if (device.type) {
        if (sensor === 'temp' || sensor === 'humi') {
            return (
                <Box sx={{my: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <RangeField type='min' device={{ type: sensor }} formik={formik}/>
                    <RangeField type='max' device={{ type: sensor }} formik={formik}/>
                </Box>
            )
        } else if (sensor === 'other') return null;
        else if (sensor === 'none' && (device.type === 'temp' || device.type === 'humi')) {
            return (
                <Box sx={{my: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <RangeField type='min' device={device} formik={formik}/>
                    <RangeField type='max' device={device} formik={formik}/>
                </Box>
            )
        }
    } else return null;   
}  

const ModalButton = ({ type, device, setShowModal, setModalOpen, setInfoModal }) => {
    const bgcolor = type === 'update' || type === 'add' ? '#6C63FF' : 'Red'
    return (
        <Button
            type={type === 'add' || type ==='update' ? 'submit' : 'button'}
            onClick={type === 'delete' ? () => DeleteDevice(device, setShowModal, setModalOpen, setInfoModal) : ''}                   
            variant="contained"
            sx = {{
                mt: 3,
                mx: 2,
                p: 1,
                width: 100,
                borderRadius: '15px',
                backgroundColor: bgcolor,
                fontSize: 12,
                '&:hover': {
                    backgroundColor: 'white',
                    color: bgcolor,
                },
            }}>
            {
                (() => {
                    switch (type) {
                        case 'add':
                            return 'Thêm';
                        case 'update':
                            return 'Cập nhật';
                        case 'delete':
                            return 'Xóa';
                        default:
                            return '';
                    }
                })()
            }
        </Button>
    )
}

const AlertModal = ({ showModal, setShowModal, infoModal }) => {
    return (
        <Modal
            open={showModal}
            onClose={() => {setShowModal(false); window.location.reload();}}
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
                    top: '5%',
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
                            onClick={() => {setShowModal(false); window.location.reload();}}>
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{
                        borderRadius: 5
                    }}>
                    {
                        (() => {
                            if (infoModal?.type === 'add') {
                                return (
                                    <>
                                        <strong>Thêm thiết bị thành công</strong>
                                        <p style={{marginBottom: 0}}>Thiết bị: {infoModal?.name}</p>
                                    </>
                                )
                            } else if (infoModal?.type === 'update') {
                                return (
                                    <>
                                        <strong>Sửa thiết bị thành công</strong>
                                        <p style={{marginBottom: 0}}>Thiết bị: {infoModal?.name}</p>
                                    </>
                                )
                            } else if (infoModal?.type === 'delete') {
                                return (
                                    <>
                                        <strong>Xóa thiết bị thành công</strong>
                                        <p style={{marginBottom: 0}}>Thiết bị: {infoModal?.name}</p>
                                    </>
                                )
                            }
                        })()
                    }           
                </Alert>
            </Box>
        </Modal>
    )
}

const DeviceModal = ({ isAdd, isModalOpen, setModalOpen, device={} }) => {
    const [showModal, setShowModal] = useState(false);
    const [infoModal, setInfoModal] = useState({});
    const formik = useFormik({
        initialValues: {
            name: isAdd ? '' : device.name,
            feed: isAdd ? '' : device.feed,
            type: isAdd ? '' : device.type,
            min: isAdd ? '' : device.min,
            max: isAdd ? '' : device.max,
        },
        validationSchema: Yup.object({
            name: Yup
                .string()
                .required('Tên không được để trống'),
            feed: Yup
                .string()
                .required('Feed key không được để trống'),
            type: Yup
                .string()
                .required('Loại thiết bị không được để trống'),
        }),
        validateOnMount: true,
        onSubmit: async (values) => {
            try {
                if (isAdd) {
                    const path = window.location.pathname;
                    const id = path.split('/')[2];
                    await axios.post('http://localhost:5000/api/device', {
                        room: id,
                        name: values.name,
                        feed: values.feed,
                        type: values.type,
                        min: values.min,
                        max: values.max
                    });
                    setModalOpen(false);
                    setInfoModal({'type': 'add', 'name': values.name})
                    setShowModal(true);
                    console.log(values)
                } else {
                    const path = window.location.pathname;
                    const roomId = path.split('/')[2];
                    await axios.put('http://localhost:5000/api/device', {
                        room: roomId,
                        device: device.index,
                        name: values.name,
                        feed: values.feed,
                        type: values.type,
                        min: values.min,
                        max: values.max
                    });
                    setModalOpen(false);
                    setInfoModal({'type': 'update', 'name': values.name})
                    setShowModal(true);
                    console.log(values)
                }
            } catch (error) {
                console.error(error);
            }
        },
    });
    useEffect(formik.resetForm, [isModalOpen])
    const [sensor, setSensor] = useState('none'); 
    return (
        <>
            <AlertModal showModal={showModal} setShowModal={setShowModal} infoModal={infoModal}/>
            <Modal 
                open={isModalOpen}
                onClose={() => {setModalOpen(false); setSensor('none'); formik.setTouched({})}}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <Box
                    sx={{width: '400px',
                        maxWidth: '80vw',
                        position: 'fixed',
                        top: '10%',
                        bgcolor: 'background.paper',
                        p: 2,
                        borderRadius: '20px',
                        border: 'none' }}>
                    
                    {/* Title của modal */}
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" component="h2" sx={{ display: 'flex', mr: 8}}>
                            {
                                isAdd ?
                                    <p style={{ margin: "0", color: 'black', fontSize: 16 }}>Thêm thiết bị mới cho phòng</p>
                                    :
                                    <p style={{ margin: "0", color: 'black', fontSize: 16 }}>{device.name}</p>
                            }
                        </Typography>
                        <IconButton onClick={() => {setModalOpen(false); setSensor('none'); formik.setTouched({})}}>
                            <CloseOutlined />
                        </IconButton>
                    </Box>

                    <Box sx={{m: 3}} >
                        <FormControl component="form" fullWidth noValidate onSubmit={formik.handleSubmit}>
                            {/* Nhập tên thiết bị */}
                            <Box sx={{mb: 1}}>
                                <Field type='name' label='Tên thiết bị' formik={formik}/>
                            </Box>
                            {/* Nhập feed key cho thiết bị */}
                            <Box sx={{mb: 1}}>
                                <Field type='feed' label='Feed key' formik={formik}/>
                            </Box>

                            {/* Chọn loại thiết bị */}
                            <Box sx={{my: 1}}>
                                <Grid container justifyItems="flex-start" sx={{my: 1}}>
                                    <FormControl
                                        fullWidth
                                            sx={{
                                            '& .MuiInputLabel-root.Mui-focused': {
                                                color: '#6C63FF'
                                            },
                                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#6C63FF'
                                            }
                                            }}>
                                        <InputLabel id="type-select-label">Loại thiết bị</InputLabel>
                                        <Select
                                            labelId="type-select-label"
                                            label="Loại thiết bị"
                                            id='type'
                                            name='type'
                                            value={formik.values['type'] || device.type}
                                            error={formik.touched['type'] && Boolean(formik.errors['type'])}
                                            helperText={formik.touched['type'] && formik.errors['type']}
                                            onBlur={formik.handleBlur}
                                            onInputChange={() => formik.handleChange()}
                                            onChange={(event) => {                                         
                                                const selectedValue = event.target.value;
                                                if (selectedValue === 'temp') setSensor('temp');
                                                else if (selectedValue === 'humi') setSensor('humi');
                                                else setSensor('other');
                                                formik.setFieldValue('type', selectedValue);
                                            }}>
                                            <MenuItem value="light">Đèn</MenuItem>
                                            <MenuItem value="fan">Quạt</MenuItem>
                                            <MenuItem value="temp">Cảm biến nhiệt độ</MenuItem>
                                            <MenuItem value="humi">Cảm biến độ ẩm</MenuItem>
                                        </Select>
                                        {formik.touched['type'] && Boolean(formik.errors['type']) && 
                                        <Typography color="error" variant="caption" sx={{mt: '3px', mx: '14px'}}>{
                                            formik.touched['type'] && formik.errors['type']
                                        }</Typography>}
                                    </FormControl>
                                </Grid>
                            </Box>

                            {/* Nhập ngưỡng giới hạn cho thiết bị */}
                            <ShowRange isAdd={isAdd} sensor={sensor} device={device} formik={formik}/>

                            {/* Nút bấm cho modal */}
                            <Box sx={{my: 1, display: 'flex', justifyContent: 'center'}}>
                                {
                                    isAdd ?
                                        <ModalButton type='add'/>                                    
                                        : 
                                        <>
                                            <ModalButton
                                                type='delete'
                                                device={device}
                                                setShowModal={setShowModal}
                                                setModalOpen={setModalOpen}
                                                setInfoModal={setInfoModal}/>
                                            <ModalButton type='update'/> 
                                        </> 
                                }
                            </Box>
                        </FormControl>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

const AddDevice = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    return (
        <>
            <Button
                type="submit"
                onClick={() => setModalOpen(true)}
                variant="contained"
                sx = {{
                    mx: 2, 
                    p: 1,
                    backgroundColor: '#6C63FF',
                    fontSize: 12,
                    width: 120,
                    '&:hover': {
                        backgroundColor: 'white',
                        color: '#6C63FF',
                    },
                }}>
                Thêm thiết bị
            </Button>
            <DeviceModal isAdd={true} isModalOpen={isModalOpen} setModalOpen={setModalOpen}/>
        </>
    )
}

const SwitchItem = (props) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const device = props.device;
    const IconMapping = {
        'light': LightIcon,
        'fan': FanIcon,
        'temp': SensorIcon,
        'humi': SensorIcon,
    }
    return (
        <>
            <Box 
                onClick={() => setModalOpen(true)}
                sx={{
                    p: 1,
                    mt: "10px",
                    display: "flex",
                    borderRadius: '10px',
                    alignItems: 'center',
                    borderBottom: "1px solid #DBE5EB",
                    "&:hover": {
                        backgroundColor: "#6C63FF",
                        cursor: "pointer",
                    },
                }}>
                <img
                    src={IconMapping[device['type']]}
                    alt="icon"
                    style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "180%",
                        marginRight: "10px",
                        boxShadow: "0px 5px 25px -5px rgba(0,0,0,0.75)",
                    }}/>
                <p style={{marginBottom: '0', color: 'black'}}>{device['name']}&nbsp;&nbsp;&nbsp;&nbsp;</p>
            </Box>
            <DeviceModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} device={device}/>
        </>
    )
}

export default function Page () {
    const [roomName, setRoomName] = useState(undefined);
    const [listDevices, setListDevices] = useState(null);
    useEffect(() => {
        async function fetchDevices() {
            const response = await GetDevices();
            setListDevices(response);
        }
        fetchDevices();
    }, []);
    useEffect(() => {
        async function fetchRoom() {
            const path = window.location.pathname;
            const id = path.split('/')[2];
            const response = await axios.get('http://localhost:5000/api/rooms');
            const room = await response.data;
            setRoomName(room[id]['name']);
        };
        fetchRoom();
     }
    , []);
    const lights = listDevices?.map((device, index) => ({...device, index})).filter(device => device.type === 'light');
    const fans = listDevices?.map((device, index) => ({...device, index})).filter(device => device.type === 'fan');
    const sensors = listDevices?.map((device, index) => ({...device, index})).filter(device => device.type === 'temp' || device.type === 'humi');
    return (
        <Grid spacing={2} sx={{m: 4}}>
            <Grid xs={12} sx={{p: 1, display: 'flex', alignItems: 'center'}}>
                <Typography color='primary' sx={{ display: 'flex', mr: 2, fontWeight: 'bold', fontSize: '1.25rem', color: 'secondary'}}>
                    <p style={{ color: 'grey', fontWeight: 'bold', marginBottom: '0'}}>
                        {roomName}&nbsp;&nbsp;&nbsp;&nbsp;&gt;&nbsp;&nbsp;&nbsp;&nbsp;
                    </p>
                    Thiết bị và Cảm biến
                </Typography>
                <AddDevice/>
            </Grid>
            <Grid container sx={{my: 2}}>
                <Grid xs={4} sx={{p: 1}}>
                    <Item>
                        <Typography sx={{mb: 3}}>Đèn</Typography>
                        {lights?.length ? lights.map((device) => <SwitchItem device={device}/>) 
                        : <Typography sx={{color: 'black', textAlign: 'center'}}> Không có thiết bị </Typography>}
                    </Item>                     
                </Grid>
                <Grid xs={4} sx={{p: 1}}>
                    <Item>
                        <Typography sx={{mb: 3}}>Quạt</Typography>
                        {fans?.length ? fans.map((device) => <SwitchItem device={device}/>) 
                        : <Typography sx={{color: 'black', textAlign: 'center'}}> Không có thiết bị </Typography>}
                    </Item> 
                </Grid>
                <Grid xs={4} sx={{p: 1}}>
                    <Item>
                        <Typography sx={{mb: 3}}>Cảm biến</Typography>
                        {sensors?.length ? sensors.map((device) => <SwitchItem device={device}/>) 
                        : <Typography sx={{color: 'black', textAlign: 'center'}}> Không có thiết bị </Typography>}
                    </Item> 
                </Grid>
            </Grid>
        </Grid>
    )
}