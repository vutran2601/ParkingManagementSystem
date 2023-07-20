import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import { Divider } from "@material-ui/core";
import SensorIcon from "../../../../assets/images/sensorIcon.png";
import axios from "axios";
import io from "socket.io-client";

// const Username = "Hung Nguyen";

// const Search = styled("div")(({ theme }) => ({
//     position: "relative",
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: "#F6F6FB",
//     "&:hover": {
//         backgroundColor: "#eeeeee",
//     },
//     marginRight: theme.spacing(2),
//     marginLeft: 0,
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//         marginLeft: theme.spacing(3),
//         width: "auto",
//     },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//     padding: theme.spacing(0, 2),
//     height: "100%",
//     position: "absolute",
//     pointerEvents: "none",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//     color: "inherit",
//     "& .MuiInputBase-input": {
//         padding: theme.spacing(1, 1, 1, 0),
//         // vertical padding + font size from searchIcon
//         paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//         transition: theme.transitions.create("width"),
//         width: "100%",
//         [theme.breakpoints.up("md")]: {
//             width: "20ch",
//         },
//     },
// }));

const socket = io("http://localhost:5000");

export default function PrimarySearchAppBar() {
    const [notifications, setNotifications] = React.useState([]);
    const [badgeCount, setBadgeCount] = React.useState(0);

    React.useEffect(() => {
        // Fetch initial notifications data
        const GetNotification = async () => {
            const response = await axios.get("http://localhost:5000/api/noti");
            setNotifications(response.data.reverse());
            setBadgeCount(response.data.length);
        };
        GetNotification();
        socket.on("newNoti", () => GetNotification());
        return () => socket.off("newNoti");
    }, []);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [showNoti, setShowNoti] = React.useState(null);

    const handleClick = (event) => {
        setShowNoti(event.currentTarget);
    };
    const handleClose = () => {
        setShowNoti(null);
    };

    const open = Boolean(showNoti);
    const id = open ? "notification-popover" : undefined;

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>
                <Link
                    to="/profile"
                    style={{ textDecoration: "none", color: "inherit" }}>
                    Thông tin cá nhân
                </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>Tài khoản của tôi</MenuItem>
        </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit">
                    <AccountCircle />
                </IconButton>
                <p>Thông tin cá nhân</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit">
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon/>
                    </Badge>
                </IconButton>
                <p>Thông báo</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                style={{ background: "#fff", color: "#37375C" }}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit">
                            <AccountCircle />
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit">
                            <Badge
                                badgeContent={badgeCount}
                                color="error"
                                onClick={handleClick}>
                                <NotificationsIcon />
                            </Badge>
                            <Menu
                                id={id}
                                anchorEl={showNoti}
                                open={Boolean(showNoti)}
                                onClose={handleClose}>
                                <p
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: 15,
                                        marginBottom: 10,
                                        marginLeft: 10,
                                    }}>
                                    Thông báo
                                </p>
                                <Box
                                    sx={{
                                        maxHeight: "300px",
                                        overflow: "auto",
                                    }}>
                                    {notifications.length ? (
                                        notifications.map(
                                            (notification, index) => (
                                                <>
                                                    {index !== 0 && <Divider />}
                                                    <MenuItem
                                                        sx={{
                                                            fontSize: 14,
                                                            maxWidth: "370px",
                                                            whiteSpace:
                                                                "normal",
                                                            wordBreak:
                                                                "break-word",
                                                        }}>
                                                        <Box>
                                                            <img
                                                                src={SensorIcon}
                                                                alt="icon"
                                                                style={{
                                                                    width: "28px",
                                                                    height: "28px",
                                                                    borderRadius:
                                                                        "180%",
                                                                    marginRight:
                                                                        "10px",
                                                                    boxShadow:
                                                                        "0px 5px 25px -5px rgba(0,0,0,0.75)",
                                                                }}/>
                                                        </Box>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                flexDirection:
                                                                    "column",
                                                                justifyContent:
                                                                    "center",
                                                                alignItems:
                                                                    "flex-start",
                                                            }}>
                                                            <span>
                                                                <span
                                                                    style={{
                                                                        fontWeight:
                                                                            "bold",
                                                                    }}
                                                                >
                                                                    {
                                                                        notification.device
                                                                    }
                                                                    &nbsp;-&nbsp;
                                                                </span>
                                                                <span
                                                                    style={{
                                                                        fontWeight:
                                                                            "bold",
                                                                    }}
                                                                >
                                                                    {
                                                                        notification.room
                                                                    }
                                                                </span>
                                                                &nbsp;vượt
                                                                ngưỡng cho
                                                                phép:&nbsp;
                                                                <span
                                                                    style={{
                                                                        fontWeight:
                                                                            "bold",
                                                                    }}
                                                                >
                                                                    {
                                                                        notification.data
                                                                    }
                                                                    {notification.type ===
                                                                    "temp"
                                                                        ? "°C"
                                                                        : "%"}
                                                                </span>
                                                            </span>
                                                            <span>
                                                                <span
                                                                    style={{
                                                                        color: "gray",
                                                                        fontSize: 12,
                                                                    }}
                                                                >
                                                                    {
                                                                        notification.time
                                                                    }
                                                                </span>
                                                            </span>
                                                        </Box>
                                                    </MenuItem>
                                                </>
                                            )
                                        )
                                    ) : (
                                        <MenuItem
                                            sx={{
                                                fontSize: 14,
                                                width: "370px",
                                                whiteSpace: "normal",
                                                wordBreak: "break-word",
                                                justifyContent: "center",
                                            }}
                                        >
                                            Không có thông báo
                                        </MenuItem>
                                    )}
                                </Box>
                            </Menu>
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit">
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
