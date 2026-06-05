import { TopicItem } from './TopicItem.jsx'


export function TopicsList({ topics, is_enrolled }) {
    return (
        <>
            {topics.map((topic, index) => (
                <TopicItem key={index} topic={topic} is_enrolled={is_enrolled} />
            ))}
        </>
    )
}