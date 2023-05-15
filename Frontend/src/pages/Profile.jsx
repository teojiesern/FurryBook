import React from "react";
import { useParams } from "react-router-dom";

export function Profile(){
    const params = useParams()
    console.log(params.profile)
    return (
        <div>
            <h1>this is {params.user}'s profile page</h1>
        </div>
    )
}