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
import { authenticate } from "./authenticate";

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<Layout />} loader={authenticate}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Login />} />
        <Route />
        <Route />
        <Route />
        <Route />
      </Route>
  )
);
export default function App() {
  return <RouterProvider router={router} />;
}
