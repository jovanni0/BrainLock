import { useCallback, useEffect, useState } from "react";
import { useServerMetadataStore, useTargetQuizStore, useUsageModeStore } from "../store.js";
import { useNavigate } from "react-router";
import { fetchMetadataFromApi } from "../utils/server-interactions.js";
import QuizCard from "../components/QuizCard.js";
import Page from "./Page.js";


export default function ServerQuizzesPage()
{
    const routerNav = useNavigate()

    const quizzes = useServerMetadataStore(state => state.quizzesMedatata)
    const setQuizzes = useServerMetadataStore(state => state.update)
    const setTargetQuizHash = useTargetQuizStore(state => state.setHash)
    const setUsageMode = useUsageModeStore(store => store.setUsageMode)

    const [is_error, setIsError] = useState<boolean|undefined>(undefined)


    /**
     * fetch the metadata from the server
     */
    useEffect( () => 
    {
        const loadMetadata = async () => 
        {
            try 
            {
                const result = await fetchMetadataFromApi()

                if (!result)
                {
                    console.log("ERROR: api base URL is not defined. do so in the settings.")
                    setIsError(true)
                    return
                }

                setQuizzes(result)
                setIsError(false)
            } 
            catch (error) 
            {
                setIsError(true)
                console.error("Error fetching metadata:", error);
            }
        };

        loadMetadata(); 
    }, [setQuizzes])


    /**
     * customize selected quiz
     */
    const customizeQuiz = useCallback((hash: string) =>
    { 
        setUsageMode("server")
        setTargetQuizHash(hash)
        routerNav("/customize")
    }, [setUsageMode, setTargetQuizHash, routerNav])


    return (
        <Page
            callout="Available Quizzes"
            description="Select a quiz to customize and start"
            className="flex-col justify-start items-center gap-2 md:gap-4"
            backRoute="/"
            isError={ is_error === true }
            isLoading={ is_error === undefined }
            errorMessage="Failed to load quizzes from server :("
        >
        {
            quizzes.map(quiz => 
                <QuizCard 
                    key={quiz.hash}
                    title={quiz.title}
                    description={quiz.description}
                    topics={quiz.topics.map(topic => topic.name)}
                    questionNumber={quiz.questionNo}
                    className="box-border w-full cursor-pointer *:cursor-pointer"
                    onClick={() => customizeQuiz(quiz.hash)}
                />
            )
        }
        </Page>
    );
}