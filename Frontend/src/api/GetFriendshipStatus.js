import axios from "axios"

export async function GetFriendshipStatus(user2){
    const currentUser = localStorage.getItem("userId")
    try{
        const response = await axios.post(`http://localhost:3001/users/friendship-status`,{
            "senderId": currentUser,
            "receiverId": user2
        })
        return response.data
    }catch(error){
        console.log("an error occured" + error)
    }
    return null
}