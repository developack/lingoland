import { QuizItem } from "./QuizItem.jsx"


export function QuizzesList({ quizzes, is_enrolled }) {
    return (
        <>
            {quizzes.map((quiz) => (
                <QuizItem key={quiz.id} quiz={quiz} is_enrolled={is_enrolled} />
            ))}
        </>
    )
}