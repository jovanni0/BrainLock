import { Timer, Presentation, Navigation, MessageSquareMore, Server } from "lucide-react";
import { usePresentationSettingsStore } from "../stores/presentation-settings-store.js";
import Page from "./Page.js";
import SettingsCard from "../modules/SettingsCard.js";
import SettingsCategory from "../modules/SettingsCategory.js";
import { useGeneralSettings } from "../stores/general-settings-store.js";


export default function SettingsPage()
{
    const show_all_questions = usePresentationSettingsStore(store => store.show_all_questions)
    const setShowAllQuestions = usePresentationSettingsStore(store => store.setShowAllQuestions)
    const question_batch_size = usePresentationSettingsStore(store => store.question_batch_size)
    const setQuestionBatchSize = usePresentationSettingsStore(store => store.setQuestionBatchSize)

    const shuffle_questions = usePresentationSettingsStore(store => store.shuffle_questions)
    const setShuffleQuestions = usePresentationSettingsStore(store => store.setShuffleQuestions)

    const shuffle_answers = usePresentationSettingsStore(store => store.shuffle_answers)
    const setShuffleAnswers = usePresentationSettingsStore(store => store.setShuffleAnswers)

    const show_question_number = usePresentationSettingsStore(store => store.show_question_number)
    const setShowQuestioNumber = usePresentationSettingsStore(store => store.setShowQuestionNumber)

    const show_progress_bar = usePresentationSettingsStore(store => store.show_progress_bar)
    const setShowProgressBar = usePresentationSettingsStore(store => store.setShowProgressBar)

    const show_all_answers = usePresentationSettingsStore(store => store.show_all_answers)
    const setShowAllAnswers = usePresentationSettingsStore(store => store.setShowAllAnswers)

    const show_explanation = usePresentationSettingsStore(store => store.show_explanation)
    const setShowExplanation = usePresentationSettingsStore(store => store.setShowExplanation)

    const api_url = useGeneralSettings(store => store.api_url)
    const setApiUrl = useGeneralSettings(store => store.setApiUrl)


    return (
        <Page
            callout="Advanced Settings"
            description="Customize your experience"
            className="flex flex-col gap-8"
        >
            <SettingsCard
                title="Timer Settings"
                className="flex flex-col gap-2"
                svgIcon={Timer}
                iconColor="text-textblue"
                iconBackgroundShade="bg-blue/10"
            >
                <SettingsCategory
                    title="Enable Timer"
                    description="Set a time limit for each question"
                >
                    <div className="flex flex-col gap-2">
                        <div>Time per quiz</div>
                        <input 
                            className="bg-inset shadow-inset p-2 rounded-md focus:border-0! focus:outline-0"
                            type="number"
                            min={0}
                        />
                        <div className="text-textmuted text-sm">Each quiz will be 30 minutes long</div>
                    </div>
                </SettingsCategory>
                
                <SettingsCategory
                    title="Show Timer Warning"
                    description="Highlight timer when running low on time"
                >
                    <div className="flex flex-col gap-2">
                        <div>Warning threshold (seconds)</div>
                        <input 
                            className="bg-inset shadow-inset p-2 rounded-md focus:border-0! focus:outline-0"
                            type="number"
                            min={0}
                        />
                        <div className="text-textmuted text-sm">Warning appears when 10 seconds are left</div>
                    </div>
                </SettingsCategory>

                <SettingsCategory
                    title="Timer Ends Quiz"
                    description="When the timer expires, the quiz ends and you are sent to the Results page"
                />
            </SettingsCard>

            <SettingsCard
                title="Presentation Settings"
                description="Customize how questions are displayed"
                className="flex flex-col gap-2"
                svgIcon={Presentation}
                iconColor="text-textorange"
                iconBackgroundShade="bg-orange/10"
            >
                <SettingsCategory
                    title="Use All Questions"
                    description="All the questions will be used to create a set"
                    isChecked={show_all_questions}
                    reverse
                    onCheck={ () => setShowAllQuestions(!show_all_questions) }
                >
                    <div className="flex flex-col gap-2">
                        <div>Questions per set</div>
                        <input
                            type="number"
                            value={question_batch_size}
                            onChange={ (e) => setQuestionBatchSize(e.target.value ? Number(e.target.value) : undefined) }
                            className="inline-block w-full px-4 py-2 border border-secondary rounded-lg text-text-secondary relative"
                        />
                        <div className="text-textmuted text-sm">{`${question_batch_size ?? 0} questions will be picked from the total and will be shown to you.`}</div>
                    </div>
                </SettingsCategory>
                
                <SettingsCategory
                    title="Shuffle Questions"
                    description="Shuffle the questions in the set before they are presented to you"
                    isChecked={shuffle_questions}
                    onCheck={ () => setShuffleQuestions(!shuffle_questions) }
                />

                <SettingsCategory
                    title="Shuffle Answers"
                    description="Shuffle the answers for each question before they are presented to you"
                    isChecked={shuffle_answers}
                    onCheck={ () => setShuffleAnswers(!shuffle_answers) }
                />

                <SettingsCategory
                    title="Show Question Number"
                    description="Display question numbers"
                    isChecked={show_question_number}
                    onCheck={ () => setShowQuestioNumber(!show_question_number) }
                />

                <SettingsCategory
                    title="Show Progress Bar"
                    description="Display quiz progress indicator"
                    isChecked={show_progress_bar}
                    onCheck={ () => setShowProgressBar(!show_progress_bar) }
                />

                <SettingsCategory
                    title="Show All Answers In Result Page"
                    description="Display all answers, not just the correct and selected ones"
                    isChecked={show_all_answers}
                    onCheck={ () => setShowAllAnswers(!show_all_answers) }
                />

                <SettingsCategory
                    title="Show Explanation In Result Page"
                    description="Display the explanation for each question"
                    isChecked={show_explanation}
                    onCheck={ () => setShowExplanation(!show_explanation) }
                />
            </SettingsCard>

            <SettingsCard
                title="Navigation Settings"
                description="Control how users navigate the quiz"
                className="flex flex-col gap-2"
                svgIcon={Navigation}
                iconColor="text-textsuccess"
                iconBackgroundShade="bg-success/10"
            >
                <SettingsCategory
                    title="Allow Back Navigation"
                    description="Let users return to previous questions"
                />

                <SettingsCategory
                    title="Require All Answers"
                    description="Force users to answer all questions"
                />
            </SettingsCard>

            <SettingsCard
                title="Feedback Settings"
                description="Customize answer feedback options"
                className="flex flex-col gap-2"
                svgIcon={MessageSquareMore}
                iconColor="text-textyellow"
                iconBackgroundShade="bg-yellow/10"
            >                
                <SettingsCategory
                    title="Show Immediate Feedback"
                    description="Show if answer is correct/incorrect right away"
                />

                <SettingsCategory
                    title="Show Correct Answers"
                    description="Display the correct answer in results"
                />
            </SettingsCard>

            <SettingsCard
                title="Server Settings"
                description="Customize server options"
                className="flex flex-col gap-2"
                svgIcon={Server}
                iconColor="text-textyellow"
                iconBackgroundShade="bg-yellow/10"
            >                
                <SettingsCategory
                    title="External Quiz Server"
                    description="Set the URL of the server to use for quizzes."
                    isChecked={true}
                >
                    <div className="flex flex-col gap-2">
                        <div>Server URL</div>
                        <input
                            type="url"
                            value={api_url}
                            onChange={ (e) => setApiUrl(e.target.value) }
                            className="inline-block w-full px-4 py-2 border border-secondary rounded-lg text-text-secondary relative"
                        />
                        <div className="text-textmuted text-sm">This allows you to set a custom server to be used for serving quizzes (eg: https://ex.domain.com or http://localhost:9173). If you do not want to use a server, let the address field empty.</div>
                    </div>
                </SettingsCategory>
            </SettingsCard>
        </Page>
    );
}