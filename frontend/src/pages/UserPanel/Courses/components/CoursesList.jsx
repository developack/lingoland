import { CourseItem } from "./CourseItem"


export function CoursesList({ courses }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {courses.map((course) => (
                <CourseItem key={course.id} course={course} />
            ))}
        </div>
    )
}