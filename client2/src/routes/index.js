// Import Layout
import { DefaultLayout } from "../components/Layouts";
// Import Route Pages
import Dashboard from "../pages/Dashboard";
import Monitoring from "../pages/Monitoring";
import Management from "../pages/Management";


// Not Required Login
// layout:null --> No Layout
const publicRoutes = [
    
];

const privateRoutes = [
    { path: "/", component: Dashboard, layout: DefaultLayout },
    { path: "/dashboard", component: Dashboard, layout: DefaultLayout },
    { path: "/monitoring", component: Monitoring, layout: DefaultLayout },
    { path: "/management", component: Management, layout: DefaultLayout },
];

export { publicRoutes, privateRoutes };
