import { apiRequest } from "@/api/client"
import { saveTokens, removeTokens } from "@/utils/token"
import {ApiError} from "@/api/ApiError"


export const login = async (credentials) => {

    try {
        const data = await apiRequest('/api/token/', {method: 'POST', data: credentials})
        saveTokens(data)
        //Get user profile
        return await apiRequest('/api/user-profile', {method: 'GET'})

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


export const getCurrentUser = () => {

}










export const refreshAccessToken = async (refreshToken) => {

    try {
        const response = await fetch('/api/token/refresh/', {
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                refresh: refreshToken
            })
        })

        const data = await response.json()
        if (response.ok) {
            localStorage.setItem(import.meta.env.VITE_VITE_ACCESS_KEY, data.access)
            return data.access
        } else {
            return null
        }

    } catch (error) {
        console.log(error)
    }
}