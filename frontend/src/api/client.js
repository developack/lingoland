

export const apiFetch = async (endpoint, options={}) => {
    const authToken = '' //after implementing useAuth hook
    let headers = {"Content-Type": options.contentType ? options.contentType : "application/json"}
    let error = ''

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

        switch (response.status) {
            case 401:
                error = '401 error'
                break
            case 500:
                error = '500 error'
                break
            case 403:
                error = '403 error'
                break
        }

        return error

    } catch (error) {
        return 'خطا در برقراری ارتباط با سرور'
    }
}