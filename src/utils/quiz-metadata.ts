import type { Quiz, QuizMetadata, Topic } from "../types/quiz-types";

/*
*   generate the metadata for a given array of quizzes
*/
export function generateMetadata(quizzes: Quiz[])
{
    const metadata: QuizMetadata[] = quizzes.map(q => getQuizMetadata(q))

    return metadata
}

/*
*   generate the metadata for a given quiz
*/
export function getQuizMetadata(quiz: Quiz)
{
    const uniqueTopics = new Set(quiz.questions.map(q => q.topic).filter(e => e !== undefined))
    const topicNames: string[] = [...uniqueTopics];
    
    const topics: Topic[] = topicNames.map(t => ({ 
        name: t, 
        questionNo: quiz.questions.filter(q => q.topic === t).length
    }))

    const metadata: QuizMetadata = {
        hash: quiz.hash,
        title: quiz.title,
        description: quiz.description,
        questionNo: quiz.questions.length,
        topics: topics
    }

    return metadata
}