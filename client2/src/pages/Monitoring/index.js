import React, {useState,
        useEffect,
        useRef
} from "react";
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
} from "@mui/material";

const VehicleIn = () => {
    return (
        <Grid sx={{ mt: 3, p: 3, borderRadius: 5, backgroundColor: 'white' }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>Vehicle check-in</Typography>
            <Grid sx={{ my:2 }}>
                <FormLabel>Vehicle ID</FormLabel>
                <TextField name="vehicleid" fullWidth sx={{ mt: 1 }}/>
            </Grid>
            <Grid sx={{ mt:2 }}>                
                <FormLabel>Type</FormLabel>
                <RadioGroup sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <FormControlLabel value="4seater" control={<Radio />} label="4 seater" />
                    <FormControlLabel value="7seater" control={<Radio />} label="7 seater" />
                    <FormControlLabel value="truck" control={<Radio />} label="Truck" />
                </RadioGroup>                           
            </Grid>
            <Grid sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button variant="contained" color="primary">
                    <Typography sx={{ textTransform: 'none' }}>Confirm</Typography>
                </Button>
            </Grid>
        </Grid>
    )
}

const VehicleOut = () => {
    return (
        <Grid sx={{ mt: 3, p: 3, borderRadius: 5, backgroundColor: 'white' }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>Vehicle check-out</Typography>
            <Grid sx={{ my:2 }}>
                <FormLabel>Vehicle ID</FormLabel>
                <TextField name="vehicleid" fullWidth sx={{ mt: 1 }}/>
            </Grid>
            <Grid sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button variant="contained" color="primary">
                    <Typography sx={{ textTransform: 'none' }}>Confirm</Typography>
                </Button>
            </Grid>
        </Grid>
    )
}

export default function Page() {
    const [serviceSelect, setServiceSelect] = useState('')

    return (
        <Grid container>
            <Grid xs={4}>
                <Grid sx={{ m: 4 }}>
                    <Grid sx={{ p: 3, borderRadius: 5, backgroundColor: 'white' }}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>Vehicle services</Typography>
                        <Grid sx={{ my:3 }}>
                            <FormControl fullWidth>
                                <FormLabel>Select type of service</FormLabel>
                                <Select sx={{ mt: 1 }} onChange={(event) => setServiceSelect(event.target.value)}>
                                    <MenuItem value='checkin'>Vehicle check-in</MenuItem>
                                    <MenuItem value='checkout'>Vehicle check-out</MenuItem>
                                    <MenuItem value='refuel'>Refuel</MenuItem>
                                    <MenuItem value='changeoil'>Change oil</MenuItem>
                                    <MenuItem value='washing'>Washing</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    { serviceSelect === 'checkin' && <VehicleIn/> }
                    { serviceSelect === 'checkout' && <VehicleOut/> }
                </Grid>
            </Grid>
            <Grid xs={8}>
                <Grid  sx={{m: 4}}>

                </Grid>
            </Grid>
        </Grid>
	);
}