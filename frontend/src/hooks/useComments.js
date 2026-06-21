import { useState, useEffect } from "react"


export const useComments = (type, id) => {
    const authToken = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY)
    const [ comments, setComments ] = useState([])

    useEffect(() => {
        if (!id) return

        const fetchCommentsData = async () => {
            try {
                const response = await fetch(`/api/comments/${type}/${id}/`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Token ${authToken}`
                    }
                })
                const data = await response.json()
                setComments(data)
            } catch (error) {
                console.log(error)
            }
        }

        void fetchCommentsData()
    }, [id])

    return [comments, setComments]
}