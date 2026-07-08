import { useState, useEffect } from "react"
import { apiRequest } from "@/api/client"


export const useComments = (type, id) => {
    const [ comments, setComments ] = useState([])

    useEffect(() => {
        if (!id) return

        const fetchCommentsData = async () => {
            try {
                const data = await apiRequest(`/api/comments/${type}/${id}/`, {method: 'GET'})
                setComments(data)
            } catch (error) {
                console.log(error)
            }
        }

        void fetchCommentsData()
    }, [id])

    return [comments, setComments]
}