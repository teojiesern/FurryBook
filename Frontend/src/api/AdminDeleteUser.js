import axios from "axios"

export async function AdminDeleteUser(userId){
    try{
        const response = await axios.delete(`http://localhost:3001/admin/${userId}`)
        return response.data
    }catch(error){
        console.log("an error occured" + error)
    }
    return null
}