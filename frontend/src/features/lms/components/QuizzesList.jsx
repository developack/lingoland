import { QuizItem } from "./QuizItem"


export function QuizzesList({ quizzes }) {
    return (
        <div className="mr-5">
            {quizzes.map((quiz) => (
                <QuizItem key={quiz.id} quiz={quiz} />
            ))}
        </div>
    )
}