import { Check, Plus, Trash2 } from "lucide-react";
import Button from "../components/Button";
import AutoResizeTextarea from "../components/AutoResizeTextarea";
import EditableAnswer from "./EditableAnswer";
import type { QBAnswer } from "../types/quiz-builder-types";


interface Props {
    questionNo: number
    question: string
    answers: QBAnswer[]
    topic?: string
    explanation?: string
    topics?: string[]

    onEditFinished?: () => void
    onDelete?: () => void
    onTextChange?: (text: string) => void
    onTopicChange?: (topic: string) => void
    onToggleAnswer?: (uid: string) => void
    onAnswerChange?: (uid: string, text: string) => void
    onTrashAnswer?: (uid: string) => void
    addAnswer?: () => void
    onExplanationChange?: (text: string) => void
}


const QuestionEditor = (
    {
        questionNo, question, answers, topic, explanation, topics,
        onEditFinished, onDelete, onTextChange, onTopicChange, onToggleAnswer, onAnswerChange, onTrashAnswer, addAnswer, onExplanationChange
    }: Props
) =>
{
    const question_warning = question.trim() === ""
    const answer_warning = answers.some(a => a.text.trim() === "")

    return (
        <div className="flex flex-col bg-bglight p-4 md:p-6 rounded-2xl gap-2 md:gap-4 shadow-sm">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-2 items-center">
                    <span className="text-textmuted">{questionNo}</span>
                </div>

                <div className="flex flex-row">
                    <Button 
                        shadowOff 
                        svgIcon={Check} 
                        size={16} 
                        onClick={onEditFinished}
                        enabled={ !question_warning && !answer_warning }
                    />

                    <Button 
                        shadowOff 
                        svgIcon={Trash2} 
                        size={16} 
                        onClick={onDelete} 
                    />
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <span>Topic</span>

                <select 
                    value={topic} 
                    onChange={ (e) => onTopicChange?.(e.target.value) } 
                    className="p-2 rounded-md bg-outset shadow-sm focus:border-0! focus:outline-0"
                >
                    <option value="" className="bg-bglight">(None)</option>
                {
                    topics?.map(topic => 
                        <option key={topic} value={topic} className="bg-bglight">{ topic }</option>
                    )
                }
                </select>
            </div>

            <div className="flex flex-col gap-1">
                <div className="flex flex-row justify-between">
                    <span>Question</span>

                    { 
                        question_warning && 
                        <span className="text-danger">You need to provide a text to the question</span> 
                    }
                </div>

                <AutoResizeTextarea 
                    content={question} 
                    onTextChange={onTextChange} 
                />
            </div>
            
            <div className="flex flex-col gap-1">
                <div className="flex flex-row justify-between">
                    <span>Answers (click to set as correct)</span>

                    { 
                        answer_warning && 
                        <div className="text-danger">All answers need to have content</div> 
                    }
                </div>

                <div className="flex flex-col">
                {
                    answers.map(answer => 
                        <EditableAnswer
                            key={answer.id}
                            text={answer.text}
                            isChecked={answer.correct}
                            isTrashable={ answers.length > 2 }
                            onToggle={ () => onToggleAnswer?.(answer.id) }
                            onChange={ (text) => onAnswerChange?.(answer.id, text)}
                            onTrash={ () => onTrashAnswer?.(answer.id) }
                        />
                    )
                }
                    <div className="flex flex-row gap-2">
                        <Button 
                            svgIcon={Plus} 
                            text="Add Answer" 
                            onClick={addAnswer} 
                            className="flex-4 bg-outset"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <span>Explanation</span>

                <AutoResizeTextarea 
                    content={explanation} 
                    onTextChange={onExplanationChange} 
                />
            </div>
        </div>
    )
}

export default QuestionEditor