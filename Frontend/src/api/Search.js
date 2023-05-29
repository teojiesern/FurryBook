import axios from "axios";

export async function Search(queryString){
    try{
        const response = await axios.post("http://localhost:3001/users/search", { query: queryString })
        return response.data
    }catch(error){
        console.log("error occured on search", error)
    }
}