import { Plus } from "lucide-react"
import Button from "../components/Button"


interface Props {
    onClick?: () => void
}


const NoQuestionsPrompt = (
    {
        onClick
    }: Props
) =>
{
    return (
        <div className="flex flex-col items-center gap-4 p-8">
            <div className="flex flex-col items-center gap-2">
                <div className="md:text-lg">No questions added yet</div>
                <div className="text-sm md:text-base text-textmuted text-center">Click "Add Question" to create your first question</div>
            </div>

            <Button 
                text="Add Question" 
                primary 
                svgIcon={Plus} 
                onClick={onClick}
            />
        </div>
    )
}

export default NoQuestionsPrompt