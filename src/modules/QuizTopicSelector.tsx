import type { SelectableTopic } from "../types/quiz-types.js"
import Checkbox from "../components/Checkbox"


interface Props {
    topics?: SelectableTopic[],
    questionNo?: number

    onTopicToggle?: (index: number) => void
}


const QuizTopicSelector = (
    {
        topics,
        questionNo = 0,
        onTopicToggle
    }: Props
) =>
{
    return (
        <div className="flex flex-col gap-4 p-4 md:p-8 bg-bg shadow-sm rounded-2xl">
            <div className="flex flex-col">
                <div className="md:text-lg">
                    Select Topics
                </div>

                <div className="text-sm md:text-base text-textmuted">
                    Choose which topics you want to include in your quiz. Questions will be selected from your chosen topics.
                </div>
            </div>

            <div className="flex flex-col gap-2">
            {
                topics?.map( (topic, index) =>
                    <div
                        className="flex flex-row items-center gap-2 bg-bglight shadow-sm rounded-lg p-2 md:px-4 cursor-pointer *:cursor-pointer" 
                        onClick={ () => onTopicToggle?.(index) }
                    >
                        <Checkbox isChecked={topic.selected} />
                        <div className="flex-1">{topic.name === "" ? "Without Topics" : topic.name}</div>
                        <div className="text-textmuted text-sm">{`${topic.questionNo} questions`}</div>
                    </div>
                )
            }

            {
                questionNo == 0 && 
                <div className="text-textdanger text-sm">You need to select at least one topic!</div>
            }
            </div>
        </div>
    )
}

export default QuizTopicSelector