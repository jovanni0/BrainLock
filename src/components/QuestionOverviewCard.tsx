import { Check, Circle, X } from "lucide-react"
import InfoPill from "./InfoPill.js"
import type { Answer } from "../types/quiz-types.js"


export type QuestionCategory = "skipped" | "correct" | "wrong"


interface Props {
    type?: QuestionCategory
    question?: string
    explanation?: string
    questionNo?: number
    topic?: string
    answers?: Answer[]
    showAllAnswers?: boolean
    showExplanation?: boolean
}


export default function QuestionOverviewCard(
    {
        type,
        question,
        explanation,
        questionNo = 0,
        topic,
        answers,
        showAllAnswers: showAll,
        showExplanation
    }: Props)
{
    return (
        <div className="flex flex-col bg-bg shadow-sm rounded-2xl p-4 gap-2 md:gap-6">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center gap-2">
                    { type === "correct" && <Check size={20} className="text-textsuccess" /> }
                    { type === "skipped" && <Circle size={20} /> }
                    { type === "wrong" && <X size={20} className="text-textdanger" /> }
                    <div className="text-textmuted">{`Q${questionNo}.`}</div>
                    { topic && <InfoPill text={topic} /> }
                </div>
                { 
                    type === "correct" 
                    && <InfoPill 
                        text="Correct" 
                        className="bg-success" 
                    /> 
                }
                { 
                    type === "skipped" 
                    && <InfoPill text="Skipped" /> 
                }
                { 
                    type === "wrong" 
                    && <InfoPill 
                        text="Wrong" 
                        className="bg-danger" 
                    /> 
                }
            </div>
            { 
                question && 
                <div 
                    dangerouslySetInnerHTML={{__html: question}}
                    className="markdown-body"
                /> 
            }
            <div className="flex flex-col gap-2 md:gap-6">
                {
                    type === "wrong" 
                    && <div className="flex flex-wrap items-center gap-1.5">
                        <div className="text-sm md:text-base text-textmuted whitespace-nowrap">Your Answer(s):</div>
                        <div className="flex flex-col md:flex-row gp-2">
                        {
                            answers?.filter(a => a.selected && !a.correct)
                            .map(a => a.text)
                            .map( (answer, a_index) => 
                                <div 
                                    className="text-sm md:text-base text-textdanger markdown-body" 
                                    key={a_index}
                                    dangerouslySetInnerHTML={{__html: answer}}
                                />
                            )
                        }
                        </div>
                    </div>
                }
                <div className="flex flex-col md:flex-row gap-1.5">
                    <div className="text-sm md:text-base text-textmuted  whitespace-nowrap">Correct Answer(s):</div>
                    <div className="flex flex-col gap-2">
                    {
                        answers?.filter(a => a.correct)
                        .map(a => a.text)
                        .map( (answer, a_index) => 
                            <div 
                                className="text-sm md:text-base text-textsuccess markdown-body" 
                                key={a_index} 
                                dangerouslySetInnerHTML={{__html: answer}}
                            />
                            
                        )
                    }
                    </div>
                </div>

            {
                showAll &&
                <div className="flex flex-col md:flex-row gap-1.5">
                    <div className="text-sm md:text-base text-textmuted  whitespace-nowrap">Other Answer(s):</div>
                    <div className="flex flex-col gap-2">
                    {
                        answers?.filter(a => !a.correct)
                        .map(a => a.text)
                        .map( (answer, a_index) => 
                            <div 
                                className="text-sm md:text-base markdown-body" 
                                key={a_index} 
                                dangerouslySetInnerHTML={{__html: answer}}
                            />
                        )
                    }
                    </div>
                </div>
            }
            </div>

        {
            showExplanation && explanation &&
            <div className="flex flex-col md:flex-row gap-1.5">
                <div className="text-sm md:text-base text-textmuted">Explanation:</div>
                <div 
                    dangerouslySetInnerHTML={{__html: explanation}}
                    className="markdown-body"
                /> 
            </div>
        }
        </div>
    )
}