import type { Quiz } from "../types/quiz-types.js";
import { useEffect, useRef, useState } from "react";
import { useLocalQuizStore, useTargetQuizStore, useUsageModeStore, useUserTopicPreferences } from "../store.js";
import { fetchQuizFromApi } from "../utils/server-interactions.js";
import { prepareQuizForRender } from "../utils/quiz-helpers.js";
import Page from "./Page.js";
import QuestionDisplay from "../modules/QuestionDisplay.js";
import { Quiz2QBQuiz } from "../utils/quiz-builder-helpers.js";
import type { QBQuiz } from "../types/quiz-builder-types.js";



export default function PreviewPage()
{
    const is_initial_load = useRef(true)

    const usage_mode = useUsageModeStore(store => store.usageMode)
    const getLocalQuiz = useLocalQuizStore(store => store.getQuiz)
    const target_hash = useTargetQuizStore(store => store.hash)
    const targetTopicPreferences = useUserTopicPreferences(state => state.getPreference(target_hash ?? "")?.topics)

    const [quiz, setQuiz] = useState<QBQuiz|null>(null)
    const [is_error, setIsError] = useState<boolean|undefined>(undefined)


    /*
    * fetch the quiz and prepare it for rendering
    */
    useEffect(() =>
    {
        if (!target_hash) return

        const prepareQuiz = async () =>
        {
            let received_quiz: Quiz

            if (usage_mode === "server")
            {
                const result: Quiz|null|undefined = await fetchQuizFromApi(target_hash);

                if (result === null)
                {
                    console.log("ERROR: got bad quiz from server (null)")
                    setIsError(true)
                    return
                }
                else if (result === undefined)
                {
                    console.log("ERROR: api base URL is not defined. do so in the settings.")
                    setIsError(true)
                    return
                }

                console.log("INFO: got quiz from server")

                received_quiz = result
            }
            else if (usage_mode === "local")
            {
                const result = getLocalQuiz(target_hash)

                if (!result) 
                {
                    console.log("ERROR: could not get quiz from local repo (undefined)")
                    setIsError(true)
                    return
                }

                console.log("INFO: got quiz from local repo")

                received_quiz = result
            }
            else
            {
                console.log(`ERROR: invalid usage mode (${usage_mode})`)
                setIsError(true)
                return
            }

            const prepared_quiz = prepareQuizForRender(
                received_quiz, 
                undefined,
                targetTopicPreferences
            )

            const qb_quiz = Quiz2QBQuiz(prepared_quiz)

            setQuiz(qb_quiz)
            is_initial_load.current = true
            setIsError(false)
        }

        prepareQuiz()
    }, [target_hash, usage_mode, targetTopicPreferences, getLocalQuiz])


    return (
        <Page
            callout="Preview Quiz"
            className="flex flex-col gap-2 md:gap-4"
            isError={ is_error === true }
            isLoading={ is_error === undefined }
        >
        {
            quiz?.questions.map((question, index) =>
                <QuestionDisplay
                    key={question.id}
                    questionNo={index + 1}
                    question={question.text}
                    answers={question.answers}
                    topic={question.topic}
                    explanation={question.explanation}
                />
            )
        }
        </Page>
    );
}