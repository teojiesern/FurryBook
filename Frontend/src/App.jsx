import React from "react";
import {
    Navigate,
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    redirect,
} from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Login, action } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";
import { Friends } from "./pages/Friends";
import "bootstrap/dist/css/bootstrap.min.css";
import { authentication, loginPageAuth } from "./authentication";
import { TopNav } from "./components/TopNav";
import { currentUserData } from "./Utils/CurrentUserData";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Navigate to="/FurryBook" />} />
            <Route
                path="/FurryBook/login"
                element={<Login />}
                action={action}
                loader={loginPageAuth}
            />
            <Route path="/FurryBook/signup" element={<Signup />} />
            <Route path="/" element={<Layout />} loader={currentUserData}>
                <Route path="FurryBook" element={<TopNav />} loader={currentUserData}>
                    <Route index element={<Home />} loader={authentication} />
                    <Route path=":user" element={<Profile />} />
                    <Route path=":user/settings" element={<Settings />} />
                    <Route path=":user/friends" element={<Friends />} />
                </Route>
            </Route>
        </>
    )
);
export default function App() {
    return <RouterProvider router={router} />;
}
