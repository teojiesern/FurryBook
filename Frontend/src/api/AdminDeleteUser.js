import axios from "axios"
import { Const } from "../Const"

export async function AdminDeleteUser(userId){
    try{
        const response = await axios.delete(`http://${Const}:3001/admin/${userId}`)
        return response.data
    }catch(error){
        console.log("an error occured" + error)
    }
    return null
}