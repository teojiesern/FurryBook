import axios from "axios"

export async function createUser(nameInput, emailInput, phoneNumberInput, passwordInput) {
    try {
        const response = await axios.post("http://localhost:3001/users", {
            name: nameInput,
            email: emailInput,
            phoneNumber: phoneNumberInput,
            password: passwordInput,
        });
        console.log(response)
    } catch (error) {
        return error.response.data
    }
}