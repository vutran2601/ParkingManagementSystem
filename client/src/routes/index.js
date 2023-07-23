import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Monitoring from '../pages/Monitoring';
import Management from '../pages/Management';
import Layout from '../components/Layout';

const publicRoutes = [
    { path: '/', element: <Monitoring /> },
    { path: '/monitoring', element: <Monitoring /> },
    { path: '/management', element: <Management /> },
];

const PublicRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {publicRoutes.map((route, index) => {
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={<Layout>{route.element}</Layout>}
                        />
                    );
                })}
            </Routes>
        </BrowserRouter>
    );
};

export default PublicRoutes;
