interface Props {
    isActive?: boolean
    onToggle?: () => void
}

export default function ToggleSwitch(
    {
        isActive = false,
        onToggle
    }: Props)
{
    return (
        <div 
            className={`flex flex-row bg-inset-strong ${isActive ? "justify-end" : "justify-start"} rounded-full p-0.5 h-fit w-10`} 
            onClick={onToggle}
        >
            <div className={`w-5 h-5 rounded-full ${isActive ? "bg-text" : "bg-textmuted"}`} />
        </div>
    )
}