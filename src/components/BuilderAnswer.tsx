import { Trash2 } from "lucide-react";
import AutoResizeTextarea from "./AutoResizeTextarea";
import Checkbox from "./Checkbox";

interface Props {
    checked?: boolean
    text?: string
    trashable: boolean
    onClick?: () => void
    onTextChange?: (text: string) => void
    onTrash?: () => void
}


export default function BuilderAnswer(
    {
        checked, 
        text, 
        trashable = false, 
        onClick, 
        onTextChange,
        onTrash
    }: Props)
{
    return (
        <div className="flex flex-row items-center gap-2">
            <div className="p-4 cursor-pointer" onClick={onClick}>
                <Checkbox size={24} isChecked={checked}/>
            </div>
            <AutoResizeTextarea content={text} onTextChange={onTextChange} className="flex-1"/>
            {
                trashable && <Trash2 onClick={onTrash} className="text-secondary cursor-pointer" size={20}/>
            }
        </div>
    )
}