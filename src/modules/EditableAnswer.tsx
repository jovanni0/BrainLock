import { Trash2 } from "lucide-react";
import Checkbox from "../components/Checkbox";
import AutoResizeTextarea from "../components/AutoResizeTextarea";


interface Props {
    text?: string
    isChecked?: boolean
    isTrashable?: boolean
    onToggle?: () => void
    onChange?: (text: string) => void
    onTrash?: () => void
}


const EditableAnswer = (
    {
        text,
        isChecked, isTrashable,
        onToggle, onChange, onTrash
    }: Props
) =>
{
    return (
        <div className="flex flex-row items-center md:gap-2">
            <div 
                className="hidden md:inline p-2 md:p-4 cursor-pointer" 
                onClick={onToggle}
            >
                <Checkbox 
                    size={24} 
                    isChecked={isChecked}
                />
            </div>

            <div 
                className="md:hidden p-2 md:p-4 cursor-pointer" 
                onClick={onToggle}
            >
                <Checkbox 
                    size={16} 
                    isChecked={isChecked}
                />
            </div>

            <AutoResizeTextarea 
                content={text} 
                onTextChange={onChange} 
                className="flex-1"
            />

        {
            isTrashable && 
            <Trash2 
                onClick={onTrash} 
                className="text-secondary cursor-pointer" 
                size={20}
            />
        }
        </div>
    )
}

export default EditableAnswer