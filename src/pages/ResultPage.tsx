import { getQuestionStatus } from "../utils/result-helpers.js";
import { useState } from "react";
import { useLastCompletedQuiz, useUsageModeStore } from "../store.js";
import { useNavigate } from "react-router";
import { usePresentationSettingsStore } from "../stores/presentation-settings-store.js";
import ResultInfoCard from "../modules/ResultInfoCard.js";
import TabSelector from "../modules/TabSelector.js";
import Page from "./Page.js";
import QuestionOverviewCard from "../components/QuestionOverviewCard.js";


export default function ResultPage()
{
    const routerNav = useNavigate()

    const show_all_answers = usePresentationSettingsStore(store => store.show_all_answers)
    const show_explanation = usePresentationSettingsStore(store => store.show_explanation)
    const last_completed_quiz = useLastCompletedQuiz(store => store.quiz)
    const usage_mode = useUsageModeStore(store => store.usageMode)

    const [current_tab_index, setCurrentTabIndex] = useState(0);

    // 1. A question is skipped if the user did not interact with any answers at all
    const skipped_questions = last_completed_quiz?.questions.filter(
        q => q.answers.every(ans => !ans.selected)
    );

    // 2. A question is correct if every single answer option matches its correct state perfectly
    const correct_questions = last_completed_quiz?.questions.filter(
        q => q.answers.every(ans => !!ans.selected === !!ans.correct)
    );

    // 3. A question is wrong if it was not skipped AND it was not correct
    const wrong_questions = last_completed_quiz?.questions.filter(
        q => {
            const isSkipped = q.answers.every(ans => !ans.selected);
            const isCorrect = q.answers.every(ans => !!ans.selected === !!ans.correct);
            return !isSkipped && !isCorrect;
        }
    );
    const filtered_questions = current_tab_index === 0 ? last_completed_quiz?.questions : current_tab_index === 1 ? correct_questions : current_tab_index === 2 ? wrong_questions : skipped_questions


    return (
        <Page
            callout="Quiz Resaults"
            description="Check out your performance"
            className="flex flex-col gap-6 md:gap-8"
            backRoute="/customize"
        >
            <ResultInfoCard
                correctNo={ correct_questions?.length }
                wrongNo={ wrong_questions?.length }
                skippedNo={ skipped_questions?.length }
                totalNo={ last_completed_quiz?.questions.length }
                onTryAgain={ () => routerNav("/customize") }
                onChangeQuiz={ () => routerNav(usage_mode === "server" ? "/server" : "/local") }
            />
                
            <TabSelector 
                tabs={[
                    `All(${last_completed_quiz?.questions.length ?? "0"})`, 
                    `Correct(${correct_questions?.length ?? "0"})`, 
                    `Wrong(${wrong_questions?.length ?? "0"})`, 
                    `Skipped(${skipped_questions?.length ?? "0"})`
                ]} 
                selectedIndex={current_tab_index} 
                onTabIndexChanged={setCurrentTabIndex}
            />

            <div className="flex flex-col gap-2 md:gap-4">
            {
                filtered_questions?.map( (item, index) => 
                    <QuestionOverviewCard 
                        type={ getQuestionStatus(item) }
                        topic={item.topic === "" ? item.topic : undefined}
                        questionNo={index + 1} 
                        question={item.text} 
                        explanation={item.explanation}
                        answers={item.answers}
                        showAllAnswers={show_all_answers}
                        showExplanation={show_explanation}
                    />
                )
            }
            </div>
        </Page>
    );
}