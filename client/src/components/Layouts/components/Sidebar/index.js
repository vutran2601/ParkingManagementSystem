import React from "react";
import { Link } from "react-router-dom";
import {
    CDBSidebar,
    CDBSidebarHeader,
    CDBSidebarMenuItem,
    CDBSidebarContent,
    CDBSidebarMenu,
    CDBSidebarFooter,
} from "cdbreact";
import {
    Box,
    Typography} from "@mui/material";
import {Monitor,
        Dashboard,
        MonetizationOn} from '@mui/icons-material';

function Sidebar() {
    return (
        <CDBSidebar
            textColor="#333"
            backgroundColor="#f0f0f0"
            style={{
                height: "100vh",
                position: "-webkit-sticky",
                position: "sticky",
                top: "0",
            }}
        >
            <CDBSidebarHeader
                prefix={
                    <i className="fa fa-bars" />
                }>
                <Typography
                    sx={{
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}>
                        Vehicle Parking <br/> 
                        Management System
                </Typography>
             </CDBSidebarHeader>
            <CDBSidebarContent>
                <CDBSidebarMenu>
                    <CDBSidebarMenuItem>Main features</CDBSidebarMenuItem>
                    <Link to="/dashboard">
                        <CDBSidebarMenuItem>
                            <Box display="flex" alignItems="center">
                                <Dashboard sx={{ mr: 2 }} />
                                <span>Dashboard</span>
                            </Box>
                        </CDBSidebarMenuItem>
                    </Link>
                    <Link to="/monitoring">
                        <CDBSidebarMenuItem>
                            <Box display="flex" alignItems="center">
                                <Monitor sx={{ mr: 2 }} />
                                <span>Monitoring</span>
                            </Box>
                        </CDBSidebarMenuItem>
                    </Link>
                    <Link to="/management">
                        <CDBSidebarMenuItem>
                            <Box display="flex" alignItems="center">
                                <MonetizationOn sx={{ mr: 2 }} />
                                <span>Management</span>
                            </Box>
                        </CDBSidebarMenuItem>
                    </Link>
                </CDBSidebarMenu>
            </CDBSidebarContent>
            <CDBSidebarFooter>
                <CDBSidebarMenuItem icon="sign-out-alt" iconType="solid">
                    Log out
                </CDBSidebarMenuItem>
            </CDBSidebarFooter>
        </CDBSidebar>
    );
}

export default Sidebar;
