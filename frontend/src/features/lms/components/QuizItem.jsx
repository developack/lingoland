export function QuizItem({ quiz }) {
    return (
        <div className="flex flex-col gap-2">
            {quiz.title}
        </div>
    )
}