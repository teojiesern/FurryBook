import React from "react";
import { useParams } from "react-router-dom";

export function Settings(){
    const param = useParams()
    return (
        <div>
            <h1>this is {param.user}'s settings page</h1>
        </div>
    )
}