import { create } from "zustand"
import { persist } from "zustand/middleware"


type PresentationSettingsStore = {
    show_all_questions: boolean
    setShowAllQuestions: (value: boolean) => void

    question_batch_size: number|undefined
    setQuestionBatchSize: (value: number|undefined) => void

    shuffle_questions: boolean
    setShuffleQuestions: (value: boolean) => void

    shuffle_answers: boolean
    setShuffleAnswers: (value: boolean) => void

    show_question_number: boolean
    setShowQuestionNumber: (value: boolean) => void

    show_progress_bar: boolean
    setShowProgressBar: (value: boolean) => void

    show_all_answers: boolean
    setShowAllAnswers: (value: boolean) => void

    show_explanation: boolean
    setShowExplanation: (value: boolean) => void

    // Add these to your state type/interface:
    show_immediate_feedback: boolean
    setShowImmediateFeedback: (value: boolean) => void
}


export const usePresentationSettingsStore = create<PresentationSettingsStore>()(
    persist( (set) => (
{
    show_all_questions: true,
    setShowAllQuestions: (value: boolean) => set({show_all_questions: value }),

    question_batch_size: 20,
    setQuestionBatchSize: (value: number|undefined) => set({question_batch_size: value }),

    shuffle_questions: true,
    setShuffleQuestions: (value: boolean) => set({ shuffle_questions: value }),

    shuffle_answers: true,
    setShuffleAnswers: (value: boolean) => set({ shuffle_answers: value }),

    show_question_number: false,
    setShowQuestionNumber: (value: boolean) => set({ show_question_number: value }),

    show_progress_bar: true,
    setShowProgressBar: (value: boolean) => set({ show_progress_bar: value }),

    show_all_answers: false,
    setShowAllAnswers: (value: boolean) => set({ show_all_answers: value }),
    
    show_explanation: false,
    setShowExplanation: (value: boolean) => set({ show_explanation: value }),

    // Add these to your initial state / actions inside create():
    show_immediate_feedback: false, // default to false
    setShowImmediateFeedback: (value) => set({ show_immediate_feedback: value }),
}),
{
    name: "general-settings-store"
}))