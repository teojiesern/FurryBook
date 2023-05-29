import axios from "axios"

export async function FriendsRecommendation(userId) {
    try {
        const response = await axios.get(`http://localhost:3001/users/recommendation/${userId}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
    return null
}