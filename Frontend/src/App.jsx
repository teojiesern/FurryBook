// reference to more than one loader functions
// loader={async () => {
//     const authResult = await authentication();
//     if (authResult) return authResult;

//     return await profilePageData();
// }}

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
import { Login, action as loginAction } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ProfilePosts } from "./pages/profile/ProfilePosts";
import { ProfileFriends } from "./pages/profile/ProfileFriends";
import { authentication, loginPageAuth } from "./Utils/authentication";
import { TopNav } from "./components/TopNav";
import { ProfileLayout } from "./components/ProfileLayout";
import { ProfilePhotos } from "./pages/profile/ProfilePhotos";
import { Friends } from "./pages/Friends";
import { Settings } from "./pages/Settings";
import { currentUserData } from "./api/CurrentUserData";
import { AllPosts } from "./api/AllPosts";
import { PostCommentAction } from "./api/PostCommentAction";
import { userProfilePage } from "./pages/userProfilePage/userProfilePage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Navigate to="/FurryBook" />} />
            <Route
                path="/FurryBook/login"
                element={<Login />}
                action={loginAction}
                loader={loginPageAuth}
            />
            <Route path="/FurryBook/signup" element={<Signup />} />
            <Route path="/" element={<Layout />} loader={currentUserData}>
                <Route
                    path="FurryBook"
                    element={<TopNav />}
                    loader={currentUserData}
                >
                    <Route
                        index
                        element={<Home />}
                        loader={authentication}
                        action={PostCommentAction}
                    />
                    <Route
                        path="friends"
                        element={<Friends />}
                        loader={authentication}
                    />
                    <Route
                        path="settings"
                        element={<Settings />}
                        loader={authentication}
                    />
                    <Route
                        path="profile/:userId"
                        element={<ProfileLayout />}
                        loader={authentication}
                    >
                        <Route
                            index
                            element={<ProfilePosts />}
                            action={PostCommentAction}
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
                    <Route
                        path="user/:userId"
                        element={<ProfileLayout />}
                        loader={authentication}
                    >
                        <Route
                            index
                            element={<userProfilePage />}
                            action={PostCommentAction}
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
            </Route>
        </>
    )
);
export default function App() {
    return <RouterProvider router={router} />;
}
