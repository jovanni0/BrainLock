import { memo, useMemo } from "react"
import Checkbox from "../components/Checkbox"
import MarkdownParser from "../utils/markdown-parser";


interface Props {
    answer?: string
    correct?: boolean
    isColored?: boolean
    onClick?: () => void
}


const AnswerCard = (
    {
        answer = "",
        correct,
        isColored,
        onClick
    }: Props
) =>
{
    const html = useMemo(() => MarkdownParser.render(answer), [answer]);

    return (
        <div 
            className={`flex flex-row items-center gap-2 lg:gap-3 bg-outset shadow-sm rounded-lg p-2 lg:p-3 ${onClick ? "cursor-pointer" : ""}`}
            onClick={onClick}
        >
            <Checkbox 
                isChecked={correct} 
                isColored={isColored}
            />

            <div 
                className="flex flex-col markdown-body"
                dangerouslySetInnerHTML={{__html: html}}
            />
        </div>
    )
}

export default memo(AnswerCard)