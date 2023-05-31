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
import Friends from "./pages/Friends/Friends";
import { Settings } from "./pages/Settings";
import { currentUserData } from "./api/CurrentUserData";
import { AllPosts } from "./api/AllPosts";
import { PostCommentAction } from "./api/PostCommentAction";
import { userProfilePage } from "./pages/userProfilePage/userProfilePage";
import FriendsNav from "./components/FriendsNav";
import { FriendsRecommendations } from "./pages/Friends/FriendsRecommendation";
import { FriendsData } from "./api/Friends";
import { UserData } from "./api/UserData";
import { FriendsRecommendation } from "./api/FriendRecommendations";

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
                        path="friends/:userId"
                        element={<FriendsNav />}
                        loader={authentication}
                    >
                        <Route
                            index
                            element={<Friends />}
                            loader={async ({ params }) => {
                                const result = await authentication();
                                if (result) return result;
                                const friendsData = await FriendsData(
                                    params.userId
                                );
                                return friendsData;
                            }}
                        />
                        <Route
                            path="recommendation"
                            element={<FriendsRecommendations />}
                            loader={async () => {
                                const authResult = await authentication();
                                if (authResult) return authResult;
                                const recommendation =
                                    await FriendsRecommendation();
                                return recommendation;
                            }}
                        />
                    </Route>
                    <Route
                        path="settings"
                        element={<Settings />}
                        loader={authentication}
                    />
                    <Route
                        path="profile/:userId"
                        element={<ProfileLayout />}
                        loader={async ({ params }) => {
                            const authResult = await authentication();
                            if (authResult) return authResult;
                            const dataForUser = await UserData(params.userId);
                            return dataForUser;
                        }}
                    >
                        <Route
                            index
                            element={<ProfilePosts />}
                            action={PostCommentAction}
                            loader={async ({ params }) => {
                                const dataForUser = await UserData(
                                    params.userId
                                );
                                return dataForUser;
                            }}
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
