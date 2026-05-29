import { TopicItem } from './TopicItem'


export function TopicsList({ topics, is_enrolled }) {
    return (
        <div className="mr-5">
            {topics.map((topic, index) => (
                <TopicItem key={index} topic={topic} is_enrolled={is_enrolled} />
            ))}
        </div>
    )
}