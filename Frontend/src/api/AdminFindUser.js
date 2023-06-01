import axios from "axios"

export async function AdminFindUser(){
    try{
        const response = await axios.get(`http://localhost:3001/admin/usersinfo`)
        return response.data
    }catch(error){
        console.log("an error occured" + error)
    }
    return null
}