import { CourseItem } from "./CourseItem"
import { CoursesPageCard } from "@/shared/components/Skeletons/CoursesPageCard"

export function CoursesGrid({ courses, loading }) {
    return (
        <div className="grid grid-cols-3 gap-5 items-start">
            {loading
                ? <>
                    <CoursesPageCard />
                    <CoursesPageCard />
                    <CoursesPageCard />
                    <CoursesPageCard />
                    <CoursesPageCard />
                    <CoursesPageCard />
                </>
                : courses.map((course) => (
                    <CourseItem key={course.id} course={course}/>
                ))
            }
        </div>
    )
}