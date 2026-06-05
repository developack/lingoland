import { Link } from "react-router"
import { TopicsList } from "./TopicsList.jsx"
import { QuizzesList } from "./QuizzesList.jsx"


export function LessonItem({lesson, is_enrolled }) {

    const lessonItemTitle = is_enrolled
        ? <Link className="font-bold" to={`/lesson/${lesson.slug}`}>{lesson.title}</Link>
        : <div className="font-bold">{lesson.title}</div>

    return (
        <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-start gap-3">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="size-5">
                          <path strokeLinecap="round" strokeLinejoin="round"
                                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/>
                        </svg>
                    </span>
                {lessonItemTitle}
            </div>
            <TopicsList topics={lesson.topics} is_enrolled={is_enrolled}/>
            <QuizzesList quizzes={lesson.quizzes} is_enrolled={is_enrolled}/>
        </div>
    )
}