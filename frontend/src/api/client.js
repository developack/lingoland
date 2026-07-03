

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

        if (response.status === 401) return {status: 401, message: '401 error', data: response}
        if (response.status === 403) return {status: 403, message: '403 error', data: response}
        if (response.status === 500) return {status: 500, message: '500 error', data: response}

    } catch (error) {
        return error
    }
}