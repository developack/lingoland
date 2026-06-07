import { QuestionChoices } from "./QuestionChoices"


export function QuizQuestions({ questions, handleChoices }) {
    return (
        <div className="mt-5">
            {questions?.map((question) => (
                <div key={question.id}>
                    <div>{question.title}</div>
                    <QuestionChoices question={question} choices={question.choices} handleChoices={handleChoices} />
                </div>
            ))}
        </div>
    )
}