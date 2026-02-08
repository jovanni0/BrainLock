export type QBAnswer = {
    id: string
    text: string
    correct: boolean
}

export type QBQuestion = {
    id: string
    topic: string|undefined
    text: string
    answers: QBAnswer[]
    explanation: string
}

export type QBQuiz = {
    title: string
    description: string
    contributors: string
    questions: QBQuestion[]
    topics: string[]
}