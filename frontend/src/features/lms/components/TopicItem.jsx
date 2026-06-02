import { Link } from "react-router";


export function TopicItem({ topic, is_enrolled }) {
    const topicItem = (
        <span className="font-medium text-sm">{topic.title}</span>
    )

    return (
        <div className="flex flex-col gap-2">
             {topicItem}
        </div>
    )
    // return is_enrolled ? (
    //     <Link to={`/topic/${topic.slug}`} className="flex flex-col gap-2">
    //         {topicItem}
    //     </Link>
    // ) : (
    //     <div className="flex flex-col gap-2">
    //         {topicItem}
    //     </div>
    // )
}