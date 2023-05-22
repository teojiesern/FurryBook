import React from "react";
import {
    Navigate,
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Login, action } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ProfilePosts } from "./pages/profile/ProfilePosts";
import { ProfileFriends } from "./pages/profile/ProfileFriends";
import { authentication, loginPageAuth } from "./Utils/authentication";
import { TopNav } from "./components/TopNav";
import { ProfileLayout } from "./components/ProfileLayout";
import { ProfilePhotos } from "./pages/profile/ProfilePhotos";
import { OwnLayout } from "./components/OwnLayout";
import { Friends } from "./pages/Friends";
import { Settings } from "./pages/Settings";
import { currentUserData } from "./Utils/CurrentUserData";
import { allPosts } from "./Utils/AllPosts";

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
                <Route
                    path="FurryBook"
                    element={<TopNav />}
                    loader={currentUserData}
                >
                    <Route index element={<Home />} loader={authentication} />
                    <Route
                        path="friends"
                        element={<Friends />}
                        loader={authentication}
                    />
                    <Route
                        path="profile/:user"
                        element={<ProfileLayout />}
                        loader={currentUserData}
                    >
                        {/* <Route
                            path=":user"
                            element={<ProfileLayout />}
                            loader={authentication}
                        > */}
                            <Route
                                index
                                element={<ProfilePosts />}
                                loader={allPosts}
                            />
                            <Route
                                path="friends"
                                element={<ProfileFriends />}
                                loader={authentication}
                            />
                            <Route
                                path="photos"
                                element={<ProfilePhotos />}
                                loader={authentication}
                            />
                        </Route>
                    </Route>
                    <Route
                        path="settings"
                        element={<Settings />}
                        loader={authentication}
                    />
                {/* </Route> */}
            </Route>
        </>
    )
);
export default function App() {
    return <RouterProvider router={router} />;
}
