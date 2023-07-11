import React, { useState } from "react";
import {Link,
} from "react-router-dom";
import {CDBSidebar,
        CDBSidebarHeader,
        CDBSidebarMenuItem,
        CDBSidebarContent,
        CDBSidebarMenu,
        CDBSidebarFooter,
} from "cdbreact";
import {Box,
        Typography,
        Button,
} from "@mui/material";
import {Monitor,
        Dashboard,
        MonetizationOn,
} from '@mui/icons-material';

const SidebarItem = ({type, itemSelected, setItemSelected}) => {
    const IconMapping = {
        'dashboard': <Dashboard sx={{ mr: 2 }}/>,
        'monitoring': <Monitor sx={{ mr: 2 }}/>,
        'management': <MonetizationOn sx={{ mr: 2 }}/>
    };
    const firstLetter = type.charAt(0)
    const firstLetterCap = firstLetter.toUpperCase()    
    const remainingLetters = type.slice(1)
    const capitalizedText= firstLetterCap + remainingLetters
    return (
        <Link to={"/" + type}>
            <Box sx={{ mx:1 }}>
                <Button fullWidth
                        onClick={() => setItemSelected(type)}
                        sx={{
                            p: 2,
                            justifyContent: 'left',
                            color: itemSelected === type ? 'black' : '#637381',
                            backgroundColor: itemSelected === type ? '#D7D7D7' : 'transparent',
                            '&:hover': {
                                backgroundColor: itemSelected === type ? '#D7D7D7' : '#EBEBEB'
                            }
                        }}>
                    {IconMapping[type]}
                    <Typography
                        sx={{
                            textTransform: 'none',
                            fontSize: 15,
                            fontWeight: itemSelected === type ? 'bold' : 'normal',
                        }}>
                        {capitalizedText}
                    </Typography>
                </Button>
            </Box>
        </Link>
    )
}

export default function Sidebar() {
    const [itemSelected, setItemSelected] = useState('')
    return (
        <CDBSidebar
            textColor="#333"
            backgroundColor="#f0f0f0"
            style={{
                height: "100vh",
                position: "-webkit-sticky",
                position: "sticky",
                top: "0",
            }}>
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
                    <SidebarItem type='dashboard' itemSelected={itemSelected} setItemSelected={setItemSelected}/>
                    <SidebarItem type='monitoring' itemSelected={itemSelected} setItemSelected={setItemSelected}/>
                    <SidebarItem type='management' itemSelected={itemSelected} setItemSelected={setItemSelected}/>
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
