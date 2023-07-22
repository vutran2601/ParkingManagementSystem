import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
    return (
        <Toolbar
            sx={{
                backgroundColor: '#1976D2',
                color: 'white',
                justifyContent: 'center'
            }}
        >
            <Typography variant="h5" noWrap component="div" sx={{
                fontWeight: 'bold'
            }} >
                Vehicle Parking Management System
            </Typography>
        </Toolbar>
    );
};

export default Header;
