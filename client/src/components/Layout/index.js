import Sidebar from "../Sidebar";
import Header from "../Header";
import { Box } from "@mui/material";

const Layout = ({ children }) => {
    return (
        <div
            style={{
                display: 'flex',
                backgroundColor: '#f0f0f0'
            }}
        >
            <Sidebar/>
            
            <Box
                sx={{
                    width: '100%',
                }}
            >
                <Header/>
                {children}
            </Box>
        </div>
    );
}

export default Layout;
