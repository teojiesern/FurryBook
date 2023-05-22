import { redirect } from "react-router-dom"

export async function authentication() {
    const isLoggedIn = localStorage.getItem("loggedIn")

    if (!isLoggedIn) {
        return redirect("/FurryBook/login")
    }
    return null
}

export async function loginPageAuth(){
    const isLoggedIn = localStorage.getItem("loggedIn")

    if (isLoggedIn) {
        return redirect("/FurryBook")
    }
    return null
}