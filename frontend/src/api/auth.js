

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