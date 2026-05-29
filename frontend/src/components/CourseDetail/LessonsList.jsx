import { LessonItem } from './LessonItem'


export function LessonsList({ lessons, is_enrolled }) {
    return(
        lessons?.length > 0 &&
        <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2 inline-block">
                📖 سرفصل‌ها و دروس
            </h2>
            <div className="flex flex-col gap-5">
                {lessons.map((lesson, index) => (
                    <LessonItem key={index} lesson={lesson} is_enrolled={is_enrolled} />
                ))}
            </div>
        </div>
    )
}