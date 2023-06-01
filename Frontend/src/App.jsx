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
import { currentUserData } from "./api/CurrentUserData";
import { AllPosts } from "./api/AllPosts";
import { PostCommentAction } from "./api/PostCommentAction";
import FriendsNav from "./components/FriendsNav";
import { FriendsRecommendations } from "./pages/Friends/FriendsRecommendation";
import { FriendsData } from "./api/Friends";
import { UserData } from "./api/UserData";
import { FriendsRecommendation } from "./api/FriendRecommendations";
import { AdminPage } from "./pages/AdminPage";
import { AdminFindUser } from "./api/AdminFindUser";
import { AdminPageUserPosts } from "./pages/AdminPageUserPosts";
import { HomePageFetchPosts } from "./api/HomePageFetchPosts";
import { History } from "./pages/History";
import { GetSession } from "./api/getSession";

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
                        loader={async () => {
                            const authResult = await authentication();
                            if (authResult) return authResult;
                            const temp = await HomePageFetchPosts();
                            return temp;
                        }}
                        action={PostCommentAction}
                    />
                    <Route
                        path="friends/:userId"
                        element={<FriendsNav />}
                        loader={async () => {
                            const authResult = await authentication();
                            if (authResult) return authResult;
                            return currentUserData();
                        }}
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
                        path="history"
                        element={<History />}
                        loader={async () => {
                            const authResult = await authentication();
                            if (authResult) return authResult;
                            const temp = await GetSession();
                            return temp;
                        }}
                    />
                    <Route
                        path="adminPage"
                        element={<AdminPage />}
                        loader={async () => {
                            const authResult = await authentication();
                            if (authResult) return authResult;
                            const allUsers = await AdminFindUser();
                            return allUsers;
                        }}
                    />
                    <Route
                        path="adminPage/:userId"
                        element={<AdminPageUserPosts />}
                        loader={async ({ params }) => {
                            const authResult = await authentication();
                            if (authResult) return authResult;
                            const allPosts = await AllPosts(params.userId);
                            return allPosts;
                        }}
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
