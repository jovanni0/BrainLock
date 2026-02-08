import { memo } from "react"
import { CalcFillerPercentage } from "../utils/progress-bar"
import InfoPill from "./InfoPill"


interface Props {
    display?: boolean
    index?: number
    size?: number
    topic?: string
}


const ProgressIndicator = (
    {
        display = true,
        index = 0, 
        size = 0, 
        topic
    }: Props
) =>
{
    if (!display) return

    return (
        <div className="flex flex-col gap-1">
            <div className="flex flex-row justify-between">
                <div className="text-sm text-textmuted">
                    { `Question ${index + 1} of ${size}` }
                </div>
                { 
                    topic && 
                    <InfoPill text={topic} /> 
                }
            </div>

            <div className="flex bg-bglight shadow-sm h-2 rounded-full overflow-clip">
                <div className="bg-textmuted" style={{ width: CalcFillerPercentage(index, size) + "%" }}/>
            </div>
        </div>
    )
}

export default memo(ProgressIndicator)