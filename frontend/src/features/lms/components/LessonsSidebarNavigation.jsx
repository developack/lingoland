import { Link } from "react-router"
import { SidebarLessonTopics } from "./SidebarLessonTopics"
import { SidebarLessonQuizzes } from "./SidebarLessonQuizzes"


export function LessonsSidebarNavigation({ learningContext, lessonId, stepId='', loading }) {
    return (
        <aside className="w-96 border-l border-border bg-white overflow-y-auto">

            <div className="border-b border-border p-4">
                <h3 className="font-bold">Course Lessons</h3>
            </div>

            {loading
                ? <>
                    <div className="flex flex-col gap-2 p-4">
                        <p className="w-full h-3 skeleton"></p>
                        <p className="w-full h-3 skeleton"></p>
                        <p className="w-[50%] h-3 skeleton"></p>
                    </div>
                    <div className="flex flex-col gap-2 p-4">
                        <p className="w-full h-3 skeleton"></p>
                        <p className="w-full h-3 skeleton"></p>
                        <p className="w-[50%] h-3 skeleton"></p>
                    </div>
                    <div className="flex flex-col gap-2 p-4">
                        <p className="w-full h-3 skeleton"></p>
                        <p className="w-full h-3 skeleton"></p>
                        <p className="w-[50%] h-3 skeleton"></p>
                    </div>
                    <div className="flex flex-col gap-2 p-4">
                        <p className="w-full h-3 skeleton"></p>
                        <p className="w-full h-3 skeleton"></p>
                        <p className="w-[50%] h-3 skeleton"></p>
                    </div>
                    <div className="flex flex-col gap-2 p-4">
                        <p className="w-full h-3 skeleton"></p>
                        <p className="w-full h-3 skeleton"></p>
                        <p className="w-[50%] h-3 skeleton"></p>
                    </div>
                    <div className="flex flex-col gap-2 p-4">
                        <p className="w-full h-3 skeleton"></p>
                        <p className="w-full h-3 skeleton"></p>
                        <p className="w-[50%] h-3 skeleton"></p>
                    </div>
                    <div className="flex flex-col gap-2 p-4">
                        <p className="w-full h-3 skeleton"></p>
                        <p className="w-full h-3 skeleton"></p>
                        <p className="w-[50%] h-3 skeleton"></p>
                    </div>
                </>
                : <div>
                    {learningContext?.lessons?.map((lesson) => {
                        return (
                            <button key={lesson.id} className={`w-full border-b border-border px-4 py-3 text-right transition 
                                    ${lesson.id === lessonId ? "bg-indigo-50" : "hover:bg-slate-50"}`}>

                                <div className="flex items-center justify-between">
                                    <Link to={`/lesson/${lesson.slug}/`} className="text-sm font-medium">
                                        {lesson.title}
                                    </Link>
                                    <span
                                        className={`text-xs ${lesson.is_complete ? "text-green-500" : "text-slate-400"}`}>
                                    {lesson.is_complete ? "✔" : "○"}
                                </span>
                                </div>
                                <div className="rounded-xl p-3 bg-white flex flex-col gap-3 mt-5 border border-border">
                                    <SidebarLessonTopics topics={lesson.topics} stepId={stepId}/>
                                    <SidebarLessonQuizzes quizzes={lesson.quizzes} stepId={stepId}/>
                                </div>
                            </button>
                        );
                    })}
                </div>}
        </aside>
    )
}