import React from "react";
import { Outlet } from "react-router-dom";
import { TempNavigate } from "./TempNavigate";
import "./components.css"

export function Layout(){
    return (
        <div>
            <TempNavigate />
            <Outlet />
        </div>
    )
}