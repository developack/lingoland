import { Outlet, Navigate } from "react-router"
import { useAuth } from "@/hooks/useAuth"


export const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth()

    if (loading) {
        return null
    }
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}