

export function QuestionChoices({ question, choices, handleChoices }) {

    return (
        <div className="flex justify-between my-5 bg-amber-50 p-3 rounded-xl">
            {choices.map((choice, index) => (
                <div key={index} className="flex items-center gap-2">
                    <input onChange={handleChoices} data-question={question.slug} type="radio"
                           name={question.id} value={choice.text}/>
                    <div>{choice.text}</div>
                </div>
            ))}
        </div>
    )
}