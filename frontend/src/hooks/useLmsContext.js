import { useState, useEffect } from "react";


export const useLmsContext = (course) => {
    const authToken = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY)
    const [ learningContext, setLearningContext ] = useState({})
    const [ loading, setLoading ] = useState(true)

    const fetchLearningContextData = async () => {

        try{
            const response = await fetch(`/api/course/${course}/learning-context/`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${authToken}`
                }
            })
            const data = await response.json()
            setLearningContext(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!course) return
        void fetchLearningContextData()
    }, [course])

    return {
        learningContext,
        loading,
        reload: fetchLearningContextData,
    };
}