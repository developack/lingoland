import { Link } from "react-router"
import { TopicsList } from "./TopicsList.jsx"


export function LessonItem({lesson, is_enrolled }) {

    const lessonItem = <>
        <div>
            <span className="font-bold text-sm">{lesson.title}</span>
            <p className="text-sm">{lesson.excerpt}</p>
        </div>
        <TopicsList topics={lesson.topics} is_enrolled={is_enrolled} />
    </>

    return is_enrolled ? (
        <Link to={`/lesson/${lesson.slug}`} className="flex flex-col gap-2">
            {lessonItem}
        </Link>
    ) : (
        <div className="flex flex-col gap-2">
            {lessonItem}
        </div>
    )
}