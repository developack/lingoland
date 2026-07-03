

export const getTokens = () => {
    const accessToken = localStorage.getItem(import.meta.env.VITE_ACCESS_KEY)
    const refreshToken = localStorage.getItem(import.meta.env.VITE_REFRESH_KEY)

    return {'access': accessToken, 'refresh': refreshToken}
}


export const saveTokens = (tokens) => {
    localStorage.setItem(import.meta.env.VITE_ACCESS_KEY, tokens.access)
    localStorage.setItem(import.meta.env.VITE_REFRESH_KEY, tokens.refresh)
}


export const removeTokens = () => {
    localStorage.removeItem(import.meta.env.VITE_ACCESS_KEY)
    localStorage.removeItem(import.meta.env.VITE_REFRESH_KEY)
}