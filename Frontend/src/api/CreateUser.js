import axios from "axios"
import { Const } from "../Const";

export async function createUser(onSuccess, onError, nameInput, emailInput, phoneNumberInput, passwordInput) {
    try {
        const response = await axios.post(`http://${Const}:3001/users`, {
            name: nameInput,
            email: emailInput,
            phoneNumber: phoneNumberInput,
            password: passwordInput,
        });

        onSuccess(response.data)
    } catch (error) {
        onError(error.response.data)
    }
}