import axios from "axios"
import { Const } from "../Const";

export async function FriendsData(userId) {
    try {
        const response = await axios.get(`http://${Const}:3001/users/friend/${userId}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
    return null
}