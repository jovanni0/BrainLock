import { memo } from "react"
import { CircleQuestionMark } from "lucide-react"
import Button from "../components/Button"
import IconTile from "../components/IconTile"


interface Props {
    title?: string
    description?: string
    icon?: React.ElementType
    isButtonPrimary?: boolean
    buttonText?: string
    onClick?: () => void
}


const SourceSelector = (
    {
        title, description, 
        icon: Icon = CircleQuestionMark,
        isButtonPrimary,
        buttonText,
        onClick
    }: Props
) =>
{
    return (
        <div className="flex flex-col rounded-2xl shadow-sm p-8 gap-4 bg-bg md:gap-8">
            <IconTile 
                icon={Icon}
            />

            <div className="flex flex-col gap-1">
                <div className="text-md md:text-xl">
                    {title}
                </div>
                
                <div className="text-textmuted text-sm md:text-base">
                    {description}
                </div>
            </div>
            
            <Button 
                text={buttonText} 
                className="bg-bglight" 
                onClick={onClick}
                primary={isButtonPrimary}
            />
        </div>
    )
}

export default memo(SourceSelector)