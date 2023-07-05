import { useState, useEffect, Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes";
import axios from "axios";
import { DefaultLayout } from "./components/Layouts";
import Global from "./components/Global";
import "./App.css";

const checkAuth = async () => {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
            "http://localhost:5000/auth/verifyToken",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.status === 200) {
            console.log(response.status + ": " + response.data.message);
            return true;
        }
    } catch (err) {
        console.error(err.message);
        return false;
    }
};

function App() {
    const [auth, setAuth] = useState(false);
    useEffect(() => {
        const handleCheckAuth = async (event) => {
            if (event.key === "accessToken") {
                const getAuth = await checkAuth();
                setAuth(getAuth);
            }
        };
        window.addEventListener("storage", handleCheckAuth);
        return () => {
            window.removeEventListener("storage", handleCheckAuth);
        };
    }, []);
    return (
        <div className="App">
            <Global>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        console.log(auth);
                        return (
                            <Route
                                auth
                                exact
                                key={index}
                                path={route.path}
                                element={
                                    <Fragment>
                                        <Page></Page>
                                    </Fragment>
                                }
                            />
                        );
                    })}
                    {privateRoutes.map((route, index) => {
                        const Page = route.component;
                        console.log(auth);
                        return (
                            <Route
                                auth
                                exact
                                key={index}
                                path={route.path}
                                element={
                                    <DefaultLayout>
                                        <Page></Page>
                                    </DefaultLayout>
                                }
                            />
                        );
                    })}
                </Routes>
            </Global>
        </div>
    );
}

export default App;
