// Import Layout
import { DefaultLayout } from "../components/Layouts";
// Import Route Pages
import Dashboard from "../pages/Dashboard";
import Login from "../pages/User/Login";
import Register from "../pages/User/Register";
import Profile from "../pages/User/Profile";
import History from "../pages/History";
import Rooms from "../pages/Rooms";
import Devices from "../pages/Devices";

// Not Required Login
// layout:null --> No Layout
const publicRoutes = [
    { path: "/login", component: Login, layout: null },
    { path: "/register", component: Register, layout: null },
];

const privateRoutes = [
    { path: "/", component: Dashboard, layout: DefaultLayout },
    { path: "/dashboard", component: Dashboard, layout: DefaultLayout },
    { path: "/profile", component: Profile, layout: DefaultLayout },
    { path: "/history", component: History, layout: DefaultLayout },
    { path: "/rooms", component: Rooms, layout: DefaultLayout },
    { path: "/rooms/:id/devices", component: Devices, layout: DefaultLayout },
];

export { publicRoutes, privateRoutes };
