import { createContext } from "react";


const AuthContext  = createContext()

export function AuthProvider({ children }) {
    const authToken = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY)

    return(
        <AuthContext.Provider value={{ authToken }}>
            {children}
        </AuthContext.Provider>
    )
}