import axios from "axios"

export async function AdminDeletePost(postId){
    try{
        const response = await axios.delete(`http://localhost:3001/api/posts/${postId}`)
        return response.data
    }catch(error){
        console.log("an error occured" + error)
    }
    return null
}