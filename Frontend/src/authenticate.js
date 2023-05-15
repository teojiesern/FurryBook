import { redirect } from "react-router-dom"

export function authenticate(){
    const isLoggedIn = false

    if(!isLoggedIn){
        return redirect("/login")
    }
    return null
}