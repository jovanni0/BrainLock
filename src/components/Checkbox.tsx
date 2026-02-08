import { Check } from "lucide-react";
import { memo } from "react";


interface Props {
    isChecked?: boolean
    size?: number
    isColored?: boolean
}


const Checkbox = (
    {
        size = 16,
        isChecked = false,
        isColored
    }: Props
) =>
{
    return (
        <div 
            className={`
                flex items-center justify-center bg-inset text-text rounded-full shrink-0 
                ${isColored && isChecked ? "border-success bg-success" : ""}
            `}
            style={{width: size + 8, height: size + 8}}
        >
        {
            isChecked && 
            <Check size={size} />
        }
        </div>
    )
}

export default memo(Checkbox)