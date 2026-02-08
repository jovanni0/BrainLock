import { memo } from "react"
import { House, RotateCcw } from "lucide-react"
import InfoTile from "./InfoTile"
import Button from "../components/Button"


interface Props {
    correctNo?: number
    wrongNo?: number
    skippedNo?: number
    totalNo?: number
    onTryAgain?: () => void
    onChangeQuiz?: () => void
}


const ResultInfoCard = (
    {
        correctNo = 0,
        wrongNo = 0,
        skippedNo = 0,
        totalNo = 0,
        onTryAgain,
        onChangeQuiz
    }: Props
) =>
{
    return (
        <div className="grid grid-cols-2 md:flex flex-row gap-2 md:gap-4">
            <InfoTile title="Score">
                <span className="text-2xl md:text-3xl">
                    0%
                </span>
            </InfoTile>

            <InfoTile title="Correct">
                <div className="flex flex-row items-center gap-1">
                    <span className="text-2xl md:text-3xl text-textsuccess">{ correctNo }</span>
                    <span className="text-textmuted">/</span>
                    <span className="text-textmuted">{ totalNo }</span>
                </div>
            </InfoTile>

            <InfoTile title="Wrong">
                <div className="flex flex-row items-center gap-1">
                    <span className="text-2xl md:text-3xl text-textdanger">{ wrongNo }</span>
                    <span className="text-textmuted">/</span>
                    <span className="text-textmuted">{ totalNo }</span>
                </div>
            </InfoTile>

            <InfoTile title="Skipped">
                <div className="flex flex-row items-center gap-1">
                    <span className="text-2xl md:text-3xl">{ skippedNo }</span>
                    <span className="text-textmuted">/</span>
                    <span className="text-textmuted">{ totalNo }</span>
                </div>
            </InfoTile>

            <div className="col-span-2 flex flex-col flex-1 gap-2">
                <Button 
                    primary
                    text="Try Again" 
                    svgIcon={RotateCcw} 
                    onClick={onTryAgain} 
                />

                <Button 
                    text="Change Quiz" 
                    svgIcon={House} 
                    onClick={onChangeQuiz} 
                />
            </div>
        </div>
    )
}

export default memo(ResultInfoCard)