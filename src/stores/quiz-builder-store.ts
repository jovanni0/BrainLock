import type { QBQuiz } from "../types/quiz-builder-types"
import { persist } from "zustand/middleware"
import { create } from "zustand"



type QuizBuilderStore = {
    originalHash: string|undefined

    quiz: QBQuiz|undefined
    setQuiz: (quiz: QBQuiz|undefined) => void
    updateQuiz: (updater: (prev: QBQuiz) => QBQuiz) => void

    setOriginalHash: (hash: string|undefined) => void
}


export const useQuizBuilderStore = create<QuizBuilderStore>()(
    persist( (set) => ({
        quiz: undefined,
        originalHash: undefined,

        setQuiz(quiz: QBQuiz|undefined)
        {
            set({quiz: quiz})
        },
        updateQuiz(updater) 
        {
            set((state) => {
                if (!state.quiz) return state;

                return { quiz: updater(state.quiz) }
            })
        },

        setOriginalHash(hash: string|undefined)
        {
            set({originalHash: hash})
        }
    }),
{
    name: "quiz-builder-store"
}))