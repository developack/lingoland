import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { LearningHeader } from "../features/lms/components/LearningHeader";
import { LessonsSidebarNavigation } from "../features/lms/components/LessonsSidebarNavigation"


export function QuizDetailPage() {
    const authToken = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY)
    const [ quiz, setQuiz ] = useState({})
    const [ choices, setChoices ] = useState([])
    const { slug } = useParams()

    useEffect(() => {
        const fetchQuizDetailData = async () => {
            try {
                const response = await fetch(`/api/quiz/${slug}/`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${authToken}`
                    }
                })

                const data = await response.json()
                setQuiz(data)

            } catch (error) {
                console.log(error)
            }
        }

        void fetchQuizDetailData()
    }, [slug]);

    const handleChoices = (event) => {
        const question = event.target.dataset.question
        const choice = event.target.value
        setChoices((prev) => {
            const existingIndex = prev.findIndex((item) => item.question === question)

            if (existingIndex > -1) {
                const updatedChoices = [...prev]
                updatedChoices[existingIndex] = { ...updatedChoices[existingIndex], choice: choice}
                return updatedChoices
            }

            return [...prev, {question, choice}]
        })
    }

    const handleQuizSubmit = async () => {
        try {
            const response = await fetch(`/api/quiz/${slug}/submit/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${authToken}`
                },
                body: JSON.stringify({
                    answers: choices
                })
            })

            const data = await response.json()
            console.log(data)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">

            <LearningHeader step={quiz} />

            <div className="flex flex-1 overflow-hidden">

                <LessonsSidebarNavigation step={quiz} />

                <main className="flex-1 overflow-y-auto p-8 container">
                    <div className="mx-auto max-w-4xl">

                        <h2 className="mb-4 text-2xl font-bold">
                            {quiz.title}
                        </h2>

                        <div className="rounded-xl border bg-white p-6 shadow-sm">
                            <p className="text-slate-700 leading-7">
                                {quiz.content}
                            </p>
                            <div className="mt-5">
                                {quiz?.questions?.map((question) => (
                                    <div key={question.id}>
                                        <div>{question.title}</div>
                                        <div className="flex justify-between my-5 bg-amber-50 p-3 rounded-xl">
                                            {question.choices.map((choice, index) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    <input onChange={handleChoices} data-question={question.slug} type="radio" name={question.id} value={choice.text}/>
                                                    <div>{choice.text}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button onClick={handleQuizSubmit} className="bg-primary text-white rounded-xl p-3 text-sm cursor-pointer mt-5">تایید و ثبت نهایی</button>
                    </div>
                </main>
            </div>
        </div>
    );
}