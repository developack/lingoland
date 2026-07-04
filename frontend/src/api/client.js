import { ApiError } from "@/api/ApiError"

export const apiRequest = async (endpoint, options={}) => {
    const authToken = '' //after implementing useAuth hook
    let headers = {"Content-Type": options.contentType ? options.contentType : "application/json"}

    if (authToken) {
        headers.Authorization = `Bearer ${authToken}`
    }

    let config = {
        method: options.method,
        headers: headers,
    }

    if (options.data) {
        config.body = options.data
    }

    const response = await fetch(endpoint, config)
    const data = await response.json()

    if (!response.ok) {
        throw new ApiError(response.status, response.statusText, data)
    }

    return data
}