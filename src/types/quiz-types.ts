export type QuizMetadata = {
    hash: string,
    title: string,
    description: string|undefined,
    questionNo: number,
    topics: Topic[]
}

export type Topic = {
    name: string,
    questionNo: number
}

export type SelectableTopic = {
    name: string,
    questionNo: number,
    selected: boolean
}

export type QuizTopicPreferences = {
    hash: string,
    topics: SelectableTopic[]
}

export type Question = {
    topic: string|undefined,
    text: string,
    answers: Answer[]
    explanation: string|undefined
}

export type Answer = {
    text: string,
    correct: boolean,
    selected: boolean
}

export type Quiz = {
    hash: string,
    schemaVersion: string
    title: string,
    description: string|undefined,
    contributors: string|undefined,
    questions: Question[]
}