import { createContext, useState, useEffect } from "react"
import { login as authLogin } from "@/api/auth"
import { logout as authLogout } from "@/api/auth"
import { getCurrentUser } from "@/api/auth"
import { getTokens } from "@/utils/token"
import { ApiError } from "@/api/ApiError"


export const AuthContext  = createContext()

export function AuthProvider({ children }) {
    const [ user, setUser ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const isAuthenticated = !!user

    const login = async (credentials) => {
        const user = await authLogin(credentials)
        setUser(user)
    }

    const logout = () => {
        authLogout()
        setUser(null)
    }

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const tokens = getTokens()

                if (tokens.access) {
                    setUser(await getCurrentUser())
                }

            } catch (error) {
                if (error instanceof ApiError && error.status === 401) {
                    logout()
                }
            } finally {
                setLoading(false)
            }
        }

        void initializeAuth()

    }, []);

    return(
        <AuthContext.Provider value={{ login, logout, loading, user, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}