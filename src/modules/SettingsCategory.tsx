import { memo } from "react"
import ToggleSwitch from "../components/ToggleSwitch"


interface Props {
    title?: string,
    description?: string,
    isChecked?: boolean
    reverse?: boolean
    className?: string,
    children?: React.ReactNode

    onCheck?: () => void
}


const SettingsCategory = (
    {
        title = "Primary Option Name",
        description = "Description for the primary option",
        isChecked,
        reverse,
        className,
        children,
        onCheck
    } : Props
) =>
{
    const isActive = Boolean(isChecked) !== Boolean(reverse)

    return (
        <div className={`flex flex-col w-full ${isActive && children && "gap-4"} bg-bglight shadow-sm rounded-2xl p-4`}>
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col">
                    <div>{title}</div>
                    <div className="text-textmuted">{description}</div>
                </div>

                <ToggleSwitch 
                    isActive={isChecked} 
                    onToggle={onCheck}
                />
            </div>

            <div className={`px-4 ${className}`}>
                {isActive && children}
            </div>
        </div>
    )
}

export default memo(SettingsCategory)