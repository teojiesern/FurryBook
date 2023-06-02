import axios from "axios"
import { Const } from "../Const"

export async function AdminFindUser(){
    try{
        const response = await axios.get(`http://${Const}:3001/admin/usersinfo`)
        return response.data
    }catch(error){
        console.log("an error occured" + error)
    }
    return null
}