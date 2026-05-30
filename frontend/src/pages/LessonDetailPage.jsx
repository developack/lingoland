import { Link } from "react-router"
import {useState} from "react"



export function LessonDetailPage() {
    const [activeLessonId, setActiveLessonId] = useState(1);
    const [completedLessons, setCompletedLessons] = useState([]);

    const user = {
        name: "Ali",
        progress: 35,
    };

    const lessons = [
        {
            id: 1,
            title: "مقدمه",
            content: "محتوای درس مقدمه...",
            topics: ["معرفی دوره", "نصب ابزارها"],
        },
        {
            id: 2,
            title: "React Basics",
            content: "محتوای React...",
            topics: ["JSX", "Props", "State"],
        },
        {
            id: 3,
            title: "Advanced",
            content: "محتوای پیشرفته...",
            topics: ["Hooks", "Performance"],
        },
    ];

    const activeLesson = lessons.find(l => l.id === activeLessonId);

    const toggleComplete = (id) => {
        setCompletedLessons(prev =>
            prev.includes(id)
                ? prev.filter(x => x !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">

            {/* HEADER */}
            <header className="flex items-center justify-between border-b bg-white px-6 py-4">
                <div>
                    <h1 className="text-lg font-bold">Course Player</h1>
                    <p className="text-sm text-slate-500">
                        Welcome {user.name}
                    </p>
                </div>

                <div className="w-72">
                    <div className="mb-1 flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{user.progress}%</span>
                    </div>

                    <div className="h-2 w-full rounded-full bg-slate-200">
                        <div
                            className="h-2 rounded-full bg-indigo-500"
                            style={{ width: `${user.progress}%` }}
                        />
                    </div>
                </div>
            </header>

            {/* BODY */}
            <div className="flex flex-1 overflow-hidden">

                {/* SIDEBAR (RIGHT) */}
                <aside className="w-96 border-l bg-white overflow-y-auto">

                    <div className="border-b p-4">
                        <h3 className="font-bold">Course Lessons</h3>
                        <p className="text-xs text-slate-500">
                            {completedLessons.length} / {lessons.length} completed
                        </p>
                    </div>

                    <div>
                        {lessons.map((lesson) => {
                            const isActive = lesson.id === activeLessonId;
                            const isDone = completedLessons.includes(lesson.id);

                            return (
                                <button
                                    key={lesson.id}
                                    onClick={() => setActiveLessonId(lesson.id)}
                                    className={`w-full border-b px-4 py-3 text-right transition ${
                                        isActive
                                            ? "bg-indigo-50"
                                            : "hover:bg-slate-50"
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">
                                            {lesson.title}
                                        </span>

                                        <span
                                            className={`text-xs ${
                                                isDone
                                                    ? "text-green-500"
                                                    : "text-slate-400"
                                            }`}
                                        >
                                            {isDone ? "✔" : "○"}
                                        </span>
                                    </div>

                                    <p className="text-xs text-slate-400 mt-1">
                                        {lesson.topics.length} topics
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </aside>

                {/* CONTENT */}
                <main className="flex-1 overflow-y-auto p-8 container">
                    <div className="mx-auto max-w-4xl">

                        <h2 className="mb-4 text-2xl font-bold">
                            {activeLesson.title}
                        </h2>

                        <div className="rounded-xl border bg-white p-6 shadow-sm">
                            <p className="text-slate-700 leading-7">
                                {activeLesson.content}
                            </p>

                            <div className="mt-6">
                                <h3 className="mb-2 font-semibold">
                                    Topics:
                                </h3>

                                <ul className="space-y-2 text-sm text-slate-600">
                                    {activeLesson.topics.map((t) => (
                                        <li key={t}>• {t}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* COMPLETE BUTTON */}
                            <button
                                onClick={() => toggleComplete(activeLesson.id)}
                                className={`mt-6 rounded-lg px-4 py-2 text-sm font-medium transition ${
                                    completedLessons.includes(activeLesson.id)
                                        ? "bg-green-500 text-white"
                                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                                }`}
                            >
                                {completedLessons.includes(activeLesson.id)
                                    ? "درس تکمیل شد ✓"
                                    : "تکمیل درس"}
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}