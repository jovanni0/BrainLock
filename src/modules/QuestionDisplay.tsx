import type { QBAnswer } from "../types/quiz-builder-types"
import { Pencil, Trash2 } from "lucide-react"
import { memo, useMemo } from "react"
import InfoPill from "../components/InfoPill"
import Button from "../components/Button"
import AnswerCard from "./AnswerCard"
import MarkdownParser from "../utils/markdown-parser"


interface Props {
    questionNo: number
    question: string
    answers: QBAnswer[]
    topic?: string
    explanation?: string
    highlite?: boolean
    className?: string
    onEdit?: () => void
    onDelete?: () => void
}


const QuestionDisplay = (
    { 
        questionNo, question, answers, topic, explanation, highlite, 
        className = "",
        onEdit, onDelete 
    }: Props
) =>
{
    const parsedQuestion = useMemo(() => MarkdownParser.render(question), [question]);
    const parsedExplanation = useMemo(() => MarkdownParser.render(explanation ?? ""), [explanation]);

    
    return (
        <div className={`
            flex flex-col bg-bg rounded-2xl shadow-sm overflow-clip 
            ${highlite ? "transition-all animate-pulse-twice" : ""}
            ${className}
        `}
        >
            <div className="flex flex-col p-4 md:p-6 gap-2 md:gap-6 shadow-bottom">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-2 items-center">
                        <div className="text-textmuted">{questionNo}</div>

                        { 
                            topic && 
                            <InfoPill text={topic}/> 
                        }
                    </div>

                    <div className="flex flex-row">
                    {
                        onEdit &&
                        <Button 
                            shadowOff 
                            svgIcon={Pencil} 
                            size={16} 
                            onClick={onEdit} 
                        />
                    }

                    {
                        onDelete &&
                        <Button 
                            shadowOff 
                            svgIcon={Trash2} 
                            size={16} 
                            onClick={onDelete} 
                        />
                    }
                    </div>
                </div>

                <div 
                    dangerouslySetInnerHTML={{__html: parsedQuestion}} 
                    className="markdown-body"
                />

                <div className="flex flex-col gap-1 md:gap-2">
                {
                    answers.map(answer =>
                        <AnswerCard
                            key={answer.id}
                            answer={answer.text}
                            correct={answer.correct}
                            isColored={true}
                        />
                    )
                }
                </div>
            </div>
            
            <div 
                className="p-4 md:p-6 markdown-body bg-inset"
                dangerouslySetInnerHTML={{__html: parsedExplanation ?? ""}} 
            />
        </div>
    )
}

export default memo(QuestionDisplay)