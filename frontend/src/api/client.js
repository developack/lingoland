import { ApiError } from "@/api/ApiError"
import { getTokens } from "@/utils/token"

export const apiRequest = async (endpoint, options={}) => {
    const { access } = getTokens()
    let headers = {"Content-Type": options.contentType ? options.contentType : "application/json"}

    if (access) {
        headers.Authorization = `Bearer ${access}`
    }

    let config = {
        method: options.method,
        headers: headers,
    }

    if (options.data) {
        config.body = JSON.stringify(options.data)
    }

    const response = await fetch(endpoint, config)
    const data = await response.json()

    if (!response.ok) {
        throw new ApiError(response.status, response.statusText, data)
    }

    return data
}