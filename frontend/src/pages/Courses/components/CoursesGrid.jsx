import { CourseItem } from "./CourseItem"

export function CoursesGrid({ courses }) {
    return (
        <div className="grid grid-cols-3 gap-5 items-start">
            {courses.map((course) => (
                <CourseItem key={course.id} course={course} />
            ))}
        </div>
    )
}