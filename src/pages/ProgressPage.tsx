import type { Quiz } from "../types/quiz-types.js";
import { useLastCompletedQuiz, useLocalQuizStore, useTargetQuizStore, useUsageModeStore, useUserTopicPreferences } from "../store.js";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { usePresentationSettingsStore } from "../stores/presentation-settings-store.js";
import { fetchQuizFromApi } from "../utils/server-interactions.js";
import { prepareQuizForRender } from "../utils/quiz-helpers.js";
import BlankPage from "./Page.js";
import ProgressIndicator from "../components/ProgressIndicator.js";
import QuestionHandler from "../modules/QuestionHandler.js";
import MarkdownParser from "../utils/markdown-parser.js";



export default function ProgressPage()
{
    const navigate = useNavigate()

    //-------------------
    // THING THAT NEVER CHANGE ACROSS RENDERS
    //-------------------
    const is_initial_load = useRef(true)


    //-------------------
    // THING FROM STORES
    //-------------------
    const targetHash = useTargetQuizStore(store => store.hash)
    const setLastCompletedQuiz = useLastCompletedQuiz(store => store.setQuiz)
    const targetTopicPreferences = useUserTopicPreferences(state => state.getPreference(targetHash ?? "")?.topics)
    const getLocalQuiz = useLocalQuizStore(store => store.getQuiz)
    const usage_mode = useUsageModeStore(store => store.usageMode)
    const show_all_questions = usePresentationSettingsStore(store => store.show_all_questions)
    const question_batch_size = usePresentationSettingsStore(store => store.question_batch_size)
    const shuffle_questions = usePresentationSettingsStore(store => store.shuffle_questions)
    const shuffle_answers = usePresentationSettingsStore(store => store.shuffle_answers)
    const show_question_number = usePresentationSettingsStore(store => store.show_question_number)
    const show_progress_bar = usePresentationSettingsStore(store => store.show_progress_bar)


    //-------------------
    // PAGE STATES
    //-------------------
    const [quiz, setQuiz] = useState<Quiz|null>(null)
    const [current_index, setCurrentIndex] = useState<number>(-1)
    const [is_error, setIsError] = useState<boolean|undefined>(undefined)


    //-------------------
    // THING THAT NEVER CHANGE FOR THE SAME QUESTION
    //-------------------
    const [quiz_size, setQuizSize] = useState<number>(0)
    const [question_topic, setQuestionTopic] = useState<string|undefined>(undefined)
    const [question_text, setQuestionText] = useState<string>("")

    
    // navigate back to server if there is no quiz selected
    useEffect(() =>
    {
        if (!targetHash)
        {
            navigate("/server")
        }
    }, [targetHash, navigate])


    // fetch the quiz and prepare it for rendering
    useEffect(() =>
    {
        if (!targetHash) return

        const prepareQuiz = async () =>
        {
            let received_quiz: Quiz

            if (usage_mode === "server")
            {
                const result: Quiz|null|undefined = await fetchQuizFromApi(targetHash);

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
                const result = getLocalQuiz(targetHash)

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
                MarkdownParser,
                targetTopicPreferences,
                shuffle_questions,
                shuffle_answers,
                show_all_questions,
                question_batch_size
            )

            setQuiz(prepared_quiz)
            is_initial_load.current = true
            setIsError(false)
        }

        prepareQuiz()
    }, [targetHash, usage_mode, targetTopicPreferences, shuffle_questions, shuffle_answers, show_all_questions, question_batch_size, getLocalQuiz])


    // set up values on quiz change
    useEffect(() => 
    {
        if (!quiz) return

        if (!is_initial_load.current) return

        setQuizSize(quiz.questions.length)
        changeQuestion(0)
        is_initial_load.current = false
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quiz])


    /**
     * toggles the state of and answer.
     * @param index the index of the toggled answer.
     */
    function toggleAnswer(index: number) : void
    {
        if (!quiz) return;

        const question = quiz.questions[current_index];
        const updatedAnswers = question.answers.map( (ans, a_index) =>
            a_index === index ? { ...ans, selected: !ans.selected } : ans
        );

        const updatedQuestion = { ...question, answers: updatedAnswers };

        setQuiz(prev => 
        {
            if (!prev) return prev;

            const newQuestions = [...prev.questions];
            newQuestions[current_index] = updatedQuestion;

            return { ...prev, questions: newQuestions };
        });
    }


    /**
     * change the currently displayed question index.
     * @param new_index the index of the new question.
     */
    function changeQuestion(new_index: number) : void
    {
        const new_question = quiz?.questions.at(new_index);

        if (!new_question)
        {
            console.log("ERROR: trying to set new question but it's undefined")
            return
        }

        setQuestionTopic(new_question.topic)
        setQuestionText(new_question.text)
        setCurrentIndex(new_index)
    }


    /**
     * navigate to the resault page.
     */
    function navToResultPage()
    {
        setLastCompletedQuiz(quiz);
        navigate("/resault")
    }


    return (
        <BlankPage
            className="flex flex-col gap-8"
            callout="Quiz Progress"
            description="The quiz is in progress"
            backRoute="/customize"
            isError={ is_error === true }
            isLoading={ is_error === undefined }
        >
        {
            show_progress_bar &&
            <ProgressIndicator 
                display={show_progress_bar}
                index={current_index}
                size={quiz_size}
                topic={question_topic}
            />
        }

            <QuestionHandler 
                questionNumber={ show_question_number ? current_index + 1 : undefined }
                question={question_text}
                answers={ quiz?.questions.at(current_index)?.answers ?? [] }
                isBack={ current_index > 0 }
                isFinish={ current_index + 1 === quiz_size }
                onBackNav={ () => changeQuestion(current_index - 1) }
                onNextNav={ () => changeQuestion(current_index + 1) }
                onFinish={navToResultPage}
                onToggleAnswer={toggleAnswer}
            />
        </BlankPage>
    );
}