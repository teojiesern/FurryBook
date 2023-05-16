import React from "react";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";
import { Friends } from "./pages/Friends";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate to="/FurryBook" />} />
      <Route path="/FurryBook/login" element={<Login />} />
      <Route path="/FurryBook/signup" element={<Signup />} />
      <Route path="/FurryBook" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path=":user" element={<Profile />} />
        <Route path=":user/settings" element={<Settings />} />
        <Route path=":user/friends" element={<Friends />} />
      </Route>
    </>
  )
);
export default function App() {
  return <RouterProvider router={router} />;
}
