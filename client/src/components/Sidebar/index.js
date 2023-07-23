import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    CDBSidebar,
    CDBSidebarHeader,
    CDBSidebarMenuItem,
    CDBSidebarContent,
    CDBSidebarMenu,
    CDBSidebarFooter,
} from 'cdbreact';
import {
    Box,
    Typography,
    Button
} from '@mui/material';
import {
    Monitor,
    Dashboard,
    MonetizationOn,
    MenuOutlined
} from '@mui/icons-material';

const SidebarItem = ({
    type,
    itemSelected,
    setItemSelected,
    sidebarMinimized,
}) => {
    const IconMapping = {
        dashboard: <Dashboard sx={{ mr: sidebarMinimized ? 0 : 2 }} />,
        monitoring: <Monitor sx={{ mr: sidebarMinimized ? 0 : 2 }} />,
        management: <MonetizationOn sx={{ mr: sidebarMinimized ? 0 : 2 }} />,
    };
    const firstLetter = type.charAt(0);
    const firstLetterCap = firstLetter.toUpperCase();
    const remainingLetters = type.slice(1);
    const capitalizedText = firstLetterCap + remainingLetters;
    return (
        <Link to={'/' + type}>
            <Box sx={{ mx: 1 }}>
                <Button
                    fullWidth
                    onClick={() => setItemSelected(type)}
                    sx={{
                        p: 2,
                        justifyContent: sidebarMinimized ? 'center' : 'left',
                        color: itemSelected === type ? 'black' : '#637381',
                        backgroundColor:
                            itemSelected === type ? '#D7D7D7' : 'transparent',
                        '&:hover': {
                            backgroundColor:
                                itemSelected === type ? '#D7D7D7' : '#EBEBEB',
                        },
                    }}
                >
                    {sidebarMinimized ? (
                        IconMapping[type]
                    ) : (
                        <>
                            {IconMapping[type]}
                            <Typography
                                sx={{
                                    textTransform: 'none',
                                    fontSize: 13,
                                    fontWeight:
                                        itemSelected === type
                                            ? 'bold'
                                            : 'normal',
                                }}
                            >
                                {capitalizedText}
                            </Typography>
                        </>
                    )}
                </Button>
            </Box>
        </Link>
    );
};

export default function Sidebar() {
    const [itemSelected, setItemSelected] = useState('');
    const [sidebarMinimized, setSidebarMinimized] = useState(false);
    return (
        <CDBSidebar
            textColor="#333"
            backgroundColor="#f0f0f0"
            style={{
                height: '100vh',
                position: 'sticky',
                top: '0',
                borderRight: '1px dashed #D7D7D7',
            }}
        >
            {/* Header */}
            <CDBSidebarHeader
                prefix={
                    <MenuOutlined onClick={() => setSidebarMinimized(!sidebarMinimized)}/>
                }
            >
                <Typography
                    sx={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}
                >
                    Parking <br />
                    Management System
                </Typography>
            </CDBSidebarHeader>

            {/* Content */}
            <CDBSidebarContent>
                <CDBSidebarMenu>
                    <CDBSidebarMenuItem>Main features</CDBSidebarMenuItem>
                    {
                        ['dashboard', 'monitoring', 'management'].map((menuItem, index) => {
                            return (
                                <SidebarItem
                                    key={index}
                                    type={menuItem}
                                    itemSelected={itemSelected}
                                    setItemSelected={setItemSelected}
                                    sidebarMinimized={sidebarMinimized}
                                />
                            )
                        })
                    }
                </CDBSidebarMenu>
            </CDBSidebarContent>

            {/* Footer */}
            <CDBSidebarFooter>
                
            </CDBSidebarFooter>
        </CDBSidebar>
    );
}
