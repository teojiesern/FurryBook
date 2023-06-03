import axios from "axios"
import { Const } from "../Const"

export async function LikePosts(postId){
    try{
        const currentLogin = localStorage.getItem("userId")
        const response = await axios.post(`http://${Const}:3001/api/posts/${currentLogin}/like/${postId}`)
        return response.data
    }catch(error){
        console.log("an error occured" + error)
    }
    return null
}