import type { SelectableTopic } from "../types/quiz-types.js";
import { useLocalMetadataStore, useServerMetadataStore, useTargetQuizStore, useUsageModeStore, useUserTopicPreferences } from "../store.js";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { topic2SelectableTopic } from "../utils/datatypes-convertors.js";
import { usePresentationSettingsStore } from "../stores/presentation-settings-store.js";
import BlankPage from "./Page.js";
import Button from "../components/Button.js";
import QuizTopicSelector from "../modules/QuizTopicSelector.js";


/**
 * calculates the number of questions encompased by the selected topics.
 * @param topics an array of `SelectableTopics`.
 * @returns the nunmber of question encompased by the selected topics.
 */
function calcTotalQuestions(topics?: SelectableTopic[]): number
{
    if (!topics) return 0

    const result = topics.reduce(
        (total: number, topic: SelectableTopic) => total + (topic.selected ? topic.questionNo : 0), 
        0
    )

    return result
}


export default function CustomizeQuizPage()
{
    const routerNav = useNavigate() 


    //-------------------
    // THINGS FROM STORES
    //-------------------
    const usage_mode = useUsageModeStore(store => store.usageMode)
    const target_hash = useTargetQuizStore(state => state.hash)
    const server_quiz_metadata = useServerMetadataStore(state => state.quizzesMedatata)
    const local_quiz_metadata = useLocalMetadataStore(state => state.quizzesMedatata)
    const show_all_questions = usePresentationSettingsStore(store => store.show_all_questions)
    const question_batch_size = usePresentationSettingsStore(store => store.question_batch_size)
    const setTopicPreference = useUserTopicPreferences(state => state.setPreference)
    const topics  = useUserTopicPreferences(state => state.getPreference(target_hash ?? "")?.topics)

    // const [encompased_questions, setEncompasedQuestions] = useState(0)

    const questionNo = calcTotalQuestions(topics)


    // generate a new preference pack
    useEffect(() =>
    {
        let metadata;

        if (topics) return

        if (!target_hash)
        {
            console.log("ERROR: trying to find preferance pack without target hash (undefined)")
            return
        }

        if (usage_mode === "server")
        {
            metadata = server_quiz_metadata.find(quiz => quiz.hash === target_hash)
        }
        else if (usage_mode === "local")
        {
            metadata = local_quiz_metadata.find(quiz => quiz.hash === target_hash)
        }
        else
        {
            console.log(`ERROR: invalid usage mode, must be server|local (${usage_mode})`)
            return
        }

        if (!metadata)
        {
            console.log(`ERROR: could not find the quiz by hash (${target_hash})`)
            return
        }

        const selectable_topics = topic2SelectableTopic(metadata.topics)
        setTopicPreference(target_hash, selectable_topics)
        
    }, [topics, usage_mode, target_hash, server_quiz_metadata, local_quiz_metadata, setTopicPreference])


    /**
     * toggle the state of a topic.
     * @param index the index of the topic in the array.
     */
    function toggleTopic(index: number) : void
    {
        if (!topics || !target_hash) return

        const topic = topics[index]
        if (!topic) {
            console.error(`ERROR: trying to toggle a topic at invalid index (${index})`)
            return
        }

        const new_topics = [...topics]
        new_topics[index] = {
            ...topic,
            selected: !topic.selected
        }

        setTopicPreference(target_hash, new_topics)
    }


    return (
        <BlankPage
            callout="Customize Quiz"
            description="Select what topics to appear in the quiz"
            className="flex-col justify-between"
            backRoute={usage_mode === "server" ? "/server" : "/local"}
        >
            <QuizTopicSelector
                topics={topics}
                questionNo={questionNo}
                onTopicToggle={toggleTopic}
            />

            <div className="flex flex-col bg-bg shadow-sm rounded-2xl p-4 md:px-8 gap-2 md:gap-4">
                <div className="flex flex-col md:flex-row md:gap-2 md:items-center">
                    <div className="flex flex-row gap-2">
                        <span>Total Questions Selected:</span>
                        <span>{questionNo}</span>
                    </div>
                {
                    !show_all_questions &&
                    <span className="text-textmuted text-sm">
                        {`From this total a ${question_batch_size} will be picked (change this in Settings)`}
                    </span>
                }
                </div>

                <div className="flex flex-row gap-2">
                    <Button 
                        text="Preview" 
                        onClick={() => routerNav("/preview")} 
                        enabled={ questionNo > 0 } 
                        className="md:flex-1 bg-bglight"
                    />
                    <Button 
                        primary 
                        text="Start Quiz" 
                        onClick={() => routerNav("/progress")}  
                        enabled={ questionNo > 0 } 
                        className="flex-3"
                    />
                </div>
            </div>
        </BlankPage>
    );
}