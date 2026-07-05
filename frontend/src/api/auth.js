import { apiRequest } from "@/api/client"
import { saveTokens } from "@/utils/token"
import {ApiError} from "@/api/ApiError.js";


export const login = async (credentials) => {
    const options = {
        method: 'POST',
        data: credentials
    }

    try {
        const data = await apiRequest('/api/token/', options)
        saveTokens(data)
        return data

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