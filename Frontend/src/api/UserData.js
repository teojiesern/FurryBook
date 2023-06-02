import axios from "axios"
import { Const } from "../Const"

export async function UserData(userId){
    try{
        const response = await axios.get(`http://${Const}:3001/users/${userId}`)
        return response.data
    }catch(error){
        console.log("an error occured" + error)
    }
    return null
}