import type { Answer } from "../types/quiz-types.js";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";


interface Props {
    questionNumber?: number
    question: string
    answers: Answer[]

    isBack?: boolean
    isFinish?: boolean

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
        onToggleAnswer
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
                answers.map( (answer, a_index) =>
                    <div 
                        className="flex flex-row items-center gap-2 lg:gap-3 bg-bglight shadow-sm rounded-lg p-2 lg:p-3 cursor-pointer" 
                        onClick={() => onToggleAnswer?.(a_index)}
                        key={a_index}
                    >
                        <Checkbox isChecked={answer.selected} />

                        <div 
                            className="flex flex-col markdown-body"
                            dangerouslySetInnerHTML={{__html: answer.text}}
                        />
                    </div>
                )
            }
            </div>

            <div className="flex flex-row gap-2">
                <Button 
                    text="Back" 
                    className="bg-bglight flex-1" 
                    enabled={isBack} 
                    onClick={onBackNav}
                />

            { 
                isFinish
                ? <Button 
                    primary
                    text="Finish" 
                    onClick={onFinish} 
                    className="flex-1"
                /> 
                : <Button 
                    primary
                    text="Next" 
                    onClick={onNextNav} 
                    className="flex-1"
                />
            }
            </div>
        </div>
    )
}

export default QuestionHandler