import { createContext, useState, useEffect } from "react"
import { login as authLogin } from "@/api/auth"
import { logout as authLogout } from "@/api/auth"


export const AuthContext  = createContext()

export function AuthProvider({ children }) {
    const [ user, setUser ] = useState(null)
    const [ isAuthenticated, setIsAuthenticated ] = useState(false)

    const login = async (credentials) => {
        const user = await authLogin(credentials)
        setUser(user)
        setIsAuthenticated(true)
    }

    const logout = () => {
        authLogout()
        setUser(null)
        setIsAuthenticated(false)
    }

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}