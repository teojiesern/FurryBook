import axios from "axios"

export async function LikePosts(postId){
    try{
        const currentLogin = localStorage.getItem("userId")
        const response = await axios.post(`http://localhost:3001/api/posts/${currentLogin}/like/${postId}`)
        return response.data
    }catch(error){
        console.log("an error occured" + error)
    }
    return null
}