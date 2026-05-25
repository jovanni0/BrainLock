import type { Answer } from "../types/quiz-types.js";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";


interface Props {
    questionNumber?: number
    question: string
    answers: Answer[]

    isBack?: boolean
    isFinish?: boolean

    hasChecked?: boolean
    onCheck?: () => void
    explanation?: string
    instantFeedback?: boolean

    onBackNav?: () => void
    onNextNav?: () => void
    onFinish?: () => void
    onToggleAnswer?: (index: number) => void
}


const QuestionHandler = (
    {
        questionNumber, question, answers,
        isBack, isFinish,
        onBackNav, onNextNav, onFinish,
        onToggleAnswer,
        hasChecked, onCheck, explanation, instantFeedback
    }: Props
) => 
{
    return (
        <div className="flex flex-col gap-4 md:gap-6 p-4 md:p-8 rounded-2xl bg-bg shadow-sm">
            <div className="flex flex-row gap-2">
            {
                questionNumber && 
                <div className="font-bold">
                    { `Q${questionNumber}.` }
                </div>
            }

                <div 
                    dangerouslySetInnerHTML={{ __html: question }} 
                    className="markdown-body flex-1"
                />
            </div>
            
            <div className="flex flex-col gap-2">
            {
                answers.map( (answer, a_index) => {
                    // Determine background color based on correction state
                    let feedbackClass = "bg-bglight"
                    if (hasChecked) {
                        if (answer.correct) {
                            feedbackClass = "bg-green-100 border border-green-500" // Correct answer
                        } else if (answer.selected && !answer.correct) {
                            feedbackClass = "bg-red-100 border border-red-500" // User chose wrong answer
                        }
                    }

                    return (
                        <div 
                            className={`flex flex-row items-center gap-2 lg:gap-3 shadow-sm rounded-lg p-2 lg:p-3 ${feedbackClass} ${hasChecked ? 'cursor-not-allowed' : 'cursor-pointer'}`} 
                            onClick={() => !hasChecked && onToggleAnswer?.(a_index)} // Block interaction after checking
                            key={a_index}
                        >
                            <Checkbox isChecked={answer.selected} />
                            <div 
                                className="flex flex-col markdown-body"
                                dangerouslySetInnerHTML={{__html: answer.text}}
                            />
                        </div>
                    )
                })
            }
            </div>
            {/* Explanation Block */}
            {hasChecked && explanation && (
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 text-sm">
                    <div className="font-bold text-blue-800 mb-1">Explanation:</div>
                    <div 
                        className="markdown-body"
                        dangerouslySetInnerHTML={{ __html: explanation }}
                    />
                </div>
            )}

            <div className="flex flex-row gap-2">
                <Button 
                    text="Back" 
                    className="bg-bglight flex-1" 
                    enabled={isBack} 
                    onClick={onBackNav}
                />

            {/* Step 1: User needs to check answers first */}
            { (instantFeedback && !hasChecked) ? (
                <Button 
                    primary
                    text="Check" 
                    onClick={onCheck} 
                    className="flex-1"
                />
            ) : (
                /* Step 2: Show finish or next after checking */
                isFinish ? (
                    <Button 
                        primary
                        text="Finish" 
                        onClick={onFinish} 
                        className="flex-1"
                    />
                ) : (
                    <Button 
                        primary
                        text="Next" 
                        onClick={onNextNav} 
                        className="flex-1"
                    />
                )
            )}
            </div>
        </div>
    )
}

export default QuestionHandler