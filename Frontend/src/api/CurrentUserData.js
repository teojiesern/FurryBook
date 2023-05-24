import axios from "axios"

export async function currentUserData(){
    try{
        const login = localStorage.getItem("userId")
        const response = await axios.get(`http://localhost:3001/users/${login}`)
        return response.data
    }catch(error){
        console.log("an error occured" + error)
    }
    return null
}