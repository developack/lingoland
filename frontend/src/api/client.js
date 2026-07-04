

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

    try {
        const response = await fetch(endpoint, config)
        if (response.ok) {
            return await response.json()
        }

    } catch (error) {
        return error
    }
}