import axios from "axios"

export async function AllPosts(){
    try{
        const currentLogin = localStorage.getItem("userId")
        const response = await axios.get(`http://localhost:3001/api/posts/user/${currentLogin}/posts`)
        return response.data
    }catch(error){
        console.log("an error occured" + error)
    }
    return null
}