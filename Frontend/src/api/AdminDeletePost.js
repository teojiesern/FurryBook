import axios from "axios"
import { Const } from "../Const"

export async function AdminDeletePost(postId){
    try{
        const response = await axios.delete(`http://${Const}:3001/api/posts/${postId}`)
        return response.data
    }catch(error){
        console.log("an error occured" + error)
    }
    return null
}