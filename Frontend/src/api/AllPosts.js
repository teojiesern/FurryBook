import axios from "axios"
import { Const } from "../Const"

export async function AllPosts(userId){
    try{
        const response = await axios.get(`http://${Const}:3001/api/posts/user/${userId}/posts`)
        return response.data
    }catch(error){
        console.log("an error occured" + error)
    }
    return null
}