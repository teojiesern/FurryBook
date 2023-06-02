import axios from "axios"
import { Const } from "../Const"

export async function currentUserData(){
    try{
        const login = localStorage.getItem("userId")
        const response = await axios.get(`http://${Const}:3001/users/${login}`)
        return response.data
    }catch(error){
        console.log("an error occured" + error)
    }
    return null
}