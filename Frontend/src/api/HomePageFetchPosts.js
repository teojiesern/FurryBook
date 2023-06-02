import axios from "axios"
import { Const } from "../Const";

export async function HomePageFetchPosts() {
    const userId = localStorage.getItem("userId")
    try {
        const response = await axios.get(`http://${Const}:3001/api/posts/user/${userId}/friends
        `)
        return response.data
    } catch (error) {
        console.log(error);
    }
    return null
}