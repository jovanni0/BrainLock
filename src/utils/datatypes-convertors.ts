import type { SelectableTopic, Topic } from "../types/quiz-types.js"


/**
 * converts a `Topic` array into a `SelectableTopic` array
 * @param topics the `Topic` array to be converted.
 * @returns a new `SelectableTopic` array.
 */
export function topic2SelectableTopic(topics?: Topic[]): SelectableTopic[]
{
    if (!topics) return []

    const convertedTopics: SelectableTopic[] = topics.map(topic => ({
        name: topic.name,
        questionNo: topic.questionNo,
        selected: true
    }))

    return convertedTopics
}