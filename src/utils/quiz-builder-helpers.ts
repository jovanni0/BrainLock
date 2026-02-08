import type { Answer, Question, Quiz } from "../types/quiz-types.js";
import type { QBAnswer, QBQuestion, QBQuiz } from "../types/quiz-builder-types";
import { nanoid } from "nanoid";
import { useLocalMetadataStore, useLocalQuizStore } from "../store";
import { useQuizBuilderStore } from "../stores/quiz-builder-store";
import { getQuizMetadata } from "./quiz-metadata.js";
import { BlmxInsertor } from "blmx-parser";


export function Quiz2QBQuiz(quiz: Quiz)
{
    const qb_questions = quiz.questions.map(question => 
    {
        const qb_answers: QBAnswer[] = question.answers.map(answer => ({
            id: nanoid(),
            text: answer.text,
            correct: answer.correct
        }))

        const qb_question: QBQuestion = {
            id: nanoid(),
            topic: question.topic,
            text: question.text,
            answers: qb_answers,
            explanation: question.explanation ?? ""
        }

        return qb_question
    })

    const topics = [...new Set(
        quiz.questions
            .map(x => x.topic)
            .filter(x => x !== undefined)
            .filter(x => x !== "")
    )]

    const qb_quiz: QBQuiz = {
        title: quiz.title,
        description: quiz.description ?? "",
        contributors: quiz.contributors ?? "",
        questions: qb_questions,
        topics
    }

    return JSON.parse(JSON.stringify(qb_quiz))
}


export function QBQuiz2Quiz(qb_quiz: QBQuiz): Quiz
{
    const questions: Question[] = qb_quiz.questions.map(qbQuestion =>
    {
        const answers: Answer[] = qbQuestion.answers.map(qbAnswer => ({
            text: qbAnswer.text,
            correct: qbAnswer.correct,
            selected: false
        }))

        return {
            topic: qbQuestion.topic,
            text: qbQuestion.text,
            answers,
            explanation: qbQuestion.explanation || undefined
        }
    })

    const quiz: Quiz = {
        hash: "",
        schemaVersion: "1",
        title: qb_quiz.title,
        description: qb_quiz.description || undefined,
        contributors: qb_quiz.contributors || undefined,
        questions
    }

    return JSON.parse(JSON.stringify(quiz))
}



export function generateEmptyQuiz(): QBQuiz
{
    return {
        title: "",
        description: "",
        contributors: "",
        questions: [
            {
                id: nanoid(),
                topic: undefined,
                text: "",
                answers: [
                    {
                        id: nanoid(),
                        text: "",
                        correct: false
                    },
                    {
                        id: nanoid(),
                        text: "",
                        correct: false
                    }
                ],
                explanation: ""                
            }
        ],
        topics: []
    }
}


export function generateEmptyQuestion(): QBQuestion
{
    return {
        id: nanoid(),
        topic: undefined,
        text: "",
        answers: [
            {
                id: nanoid(),
                text: "",
                correct: false
            },
            {
                id: nanoid(),
                text: "",
                correct: false
            }
        ],
        explanation: ""
    }
}


export function generateEmptyAnswer(): QBAnswer
{
    return {
        id: nanoid(),
        text: "",
        correct: false
    }
}


export function exportQBQuiz(qb_quiz: QBQuiz)
{
    const quiz = QBQuiz2Quiz(qb_quiz)
    const blmx_insertor = new BlmxInsertor(quiz)
    blmx_insertor.insert()
    const data = blmx_insertor.blmx

    if (!data) 
    {
        console.log("ERROR: error while parsing the object into BLMX")
        return
    }

    const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = quiz.title + ".blmx"

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}


export function saveQuizToLocalRepo(quiz: Quiz, hash: string, override: boolean) 
{
    const complete_quiz = { ...quiz, hash };
    const metadata = getQuizMetadata(complete_quiz);

    const localStore = useLocalQuizStore.getState();
    const metadataStore = useLocalMetadataStore.getState();

    if (override) 
    {
        const originalHash = useQuizBuilderStore.getState().originalHash;

        console.log("override")

        if (originalHash) 
        {
            localStore.removeQuiz(originalHash);
            metadataStore.removeMetadata(originalHash);
        }
    }

    localStore.addQuiz(complete_quiz);
    metadataStore.updateMetadata(metadata);
    useQuizBuilderStore.getState().setOriginalHash(hash);
}