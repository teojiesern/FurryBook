import axios from "axios"

export async function FriendsData(userId) {
    try {
        const response = await axios.get(`http://localhost:3001/users/friend/${userId}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
    return null
}