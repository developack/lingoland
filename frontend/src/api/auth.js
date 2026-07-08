import { apiRequest } from "@/api/client"
import { saveTokens, removeTokens } from "@/utils/token"
import { ApiError } from "@/api/ApiError"
import { getTokens } from "@/utils/token"


export const login = async (credentials) => {

    try {
        const data = await apiRequest('/api/token/', {method: 'POST', data: credentials})
        saveTokens(data)
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


export const refresh = async () => {
    const { refresh } = getTokens()
    const { access } = await apiRequest('api/token/refresh/', {method: 'POST', data: {refresh}, skipRefresh: true})
    saveTokens({access, refresh})
    return access
}

export const getCurrentUser = async () => {
    return await apiRequest('/api/user-profile/', {method: 'GET'})
}