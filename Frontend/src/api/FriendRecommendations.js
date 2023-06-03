import axios from "axios"
import { Const } from "../Const"

export async function FriendsRecommendation() {
    try {
        const userId = localStorage.getItem("userId")
        const response = await axios.get(`http://${Const}:3001/users/recommendation/${userId}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
    return null
}