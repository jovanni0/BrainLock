import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Quiz, QuizMetadata, QuizTopicPreferences, SelectableTopic } from "./types/quiz-types";



type TargetQuizStore = {
    hash: string | undefined,
    setHash: (par1: string) => void
}

export const useTargetQuizStore = create<TargetQuizStore>()(
    persist((set) => (
{
    hash: undefined,
    setHash: (par1: string) => 
    {
        set({hash: par1});
    }
}), 
{
    name: "target-quiz-store"
}))


export type UsageMode = "local" | "server"

type UsageModeStore = {
    usageMode: UsageMode,
    setUsageMode: (usage: UsageMode) => void
}

export const useUsageModeStore = create<UsageModeStore>()(
    persist( set => (
{
    usageMode: "server",
    setUsageMode: (usage: UsageMode) =>
    {
        set({usageMode: usage})
    }
}),
{
    name: "usage-mode-store"
}))


/*
*   saves the metadata for all the quiz files on the server
*/
type ServerMetadataStore = {
    quizzesMedatata: QuizMetadata[],
    update: (par1: QuizMetadata[]) => void
}

export const useServerMetadataStore = create<ServerMetadataStore>()( 
    persist( (set) => (
{
    quizzesMedatata: [],
    update: (par1: QuizMetadata[]) => 
    {
        set({quizzesMedatata: par1})
    }
}),
{
    name: "server-metadata-store"
}))


/*
*   saves the metadata for all the quiz files in local storage
*/
type LocalMetadataStore = {
    quizzesMedatata: QuizMetadata[],
    update: (par1: QuizMetadata[]) => void,
    removeMetadata: (quizHash: string) => void
    updateMetadata: (metadata: QuizMetadata) => void
}

export const useLocalMetadataStore = create<LocalMetadataStore>()( 
    persist( (set, get) => (
{
    quizzesMedatata: [],
    update: (par1: QuizMetadata[]) => 
    {
        set({quizzesMedatata: par1})
    },
    removeMetadata: (quizHash: string) => 
    {
        const quizzes = get().quizzesMedatata
        const filteredQuizzes = quizzes.filter(q => q.hash !== quizHash)
        set({quizzesMedatata: filteredQuizzes})
    },
    updateMetadata: (metadata: QuizMetadata) => 
    {
        const quizzes = get().quizzesMedatata
        const filteredQuizzes = quizzes.filter(q => q.hash !== metadata.hash)
        set({quizzesMedatata: [... filteredQuizzes, metadata]})
    }
}),
{
    name: "local-metadata-store"
}))


/*
*   saves the uploaded quizzes in local storage
*/
type LocalQuizStore = {
    quizzes: Quiz[],
    updateQuizzes: (par1: Quiz[]) => void
    getQuiz: (hash: string) => Quiz | undefined
    addQuiz: (quiz: Quiz) => boolean,
    removeQuiz: (quizHash: string) => void
}

export const useLocalQuizStore = create<LocalQuizStore>()( 
    persist( (set, get) => (
{
    quizzes: [],
    updateQuizzes: (par1: Quiz[]) => 
    {
        set({quizzes: par1})
    },
    getQuiz: (hash: string) => 
    {
        return get().quizzes.find(q => q.hash === hash)
    },
    addQuiz: (quiz: Quiz) => 
    {
        const currentQuizzes = get().quizzes
        const exists = currentQuizzes.some(q => q.hash === quiz.hash)

        if (exists)
        {
            return false
        }
        else
        {
            set({quizzes: [...currentQuizzes, quiz]})
            return true
        }
    },
    removeQuiz: (quizHash: string) => 
    {
        const quizzes = get().quizzes
        const filteredQuizzes = quizzes.filter(q => q.hash !== quizHash)
        set({quizzes: filteredQuizzes})
    }
}),
{
    name: "local-quiz-store"
}))


/*
*   saves the user's preferences about what topics to be saved for each quiz
*/
type UserTopicPreferences = {
    preferences: QuizTopicPreferences[],
    setPreferences: (par1: QuizTopicPreferences[]) => void,
    setPreference: (hash: string, topcis: SelectableTopic[]) => void,
    getPreference: (hash: string) => QuizTopicPreferences | null
}

export const useUserTopicPreferences = create<UserTopicPreferences>()( 
    persist( (set, get) => (
{
    preferences: [],

    /* set the entire preference list */
    setPreferences: (par1: QuizTopicPreferences[]) =>
    {
        set({preferences: par1})
    },

    /* set preferences for a single quiz, specified by hash */
    setPreference: (hash: string, topics: SelectableTopic[]) =>
    {
        set((state) => 
        {
            const existingIndex = state.preferences.findIndex((p) => p.hash === hash);

            let newPreferences: QuizTopicPreferences[];

            if (existingIndex !== -1) // If the preference exists, map over the array and replace it at the index
            {
                newPreferences = state.preferences.map( (item, index) => index === existingIndex ? ({ hash: hash, topics: topics }) : item);
            } 
            else // If it's a new preference, append it to the end of the array
            {
                newPreferences = [...state.preferences, ({ hash: hash, topics: topics })];
            }

            return { preferences: newPreferences };
        });
    },

    /* get the preferences for a quiz specified by hash */
    getPreference: (hash: string) =>
    {
        if (hash === "") return null

        return get().preferences.find(p => p.hash === hash) ?? null;
    }
}),
{
    name: "user-topic-preferences"
}))


/*
*   saves the last quiz completed (for displaing on the /resault page)
*/
type LastCompletedQuiz = {
    quiz: Quiz | null
    setQuiz: (quiz: Quiz|null) => void
}

export const useLastCompletedQuiz = create<LastCompletedQuiz>()(
    persist( (set) => (
{
    quiz: null,
    /* let's the user set the last completed quiz */
    setQuiz: (quiz: Quiz|null) => 
    {
        set({quiz: quiz})
    }
}),
{
    name: "last-completed-quiz"
}))