import { apiRequest } from "@/api/client"
import { saveTokens, removeTokens } from "@/utils/token"
import {ApiError} from "@/api/ApiError"


export const login = async (credentials) => {

    try {
        const data = await apiRequest('/api/token/', {method: 'POST', data: credentials})
        saveTokens(data)
        //Get user profile
        return await getCurrentUser()

    } catch (error) {
        const errors = {}
        if (error instanceof ApiError) {
            Object.entries(error.data).forEach(([field, message]) => {
                errors[field] = message[0]
            })
            throw errors
        }
        throw error
    }
}


export const logout = () => {
    removeTokens()
}


export const refresh = () => {

}


export const verify = () => {

}


export const getCurrentUser = async () => {

    return await apiRequest('/api/user-profile', {method: 'GET'})

}