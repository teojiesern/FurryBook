import axios from "axios"

export async function AllPosts(userId){
    try{
        const response = await axios.get(`http://localhost:3001/api/posts/user/${userId}/posts`)
        return response.data
    }catch(error){
        console.log("an error occured" + error)
    }
    return null
}