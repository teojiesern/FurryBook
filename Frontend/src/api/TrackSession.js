import axios from "axios"
import { Const } from "../Const"

export async function TrackSession(sessionUrl){
    try{
        const response = await axios.post(`http://${Const}:3001/users/trackSession`, sessionUrl)
        return "success tracking"
    }catch(error){
        console.log("an error occured" + error)
    }
    return null
}