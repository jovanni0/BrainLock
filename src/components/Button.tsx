interface Props {
    text?: string
    className?: string
    svgIcon?: React.ElementType
    primary?: boolean
    enabled?: boolean
    size?: number
    shadowOff?: boolean
    onClick?: () => void
}

export default function Button({
    className = "",
    text,
    svgIcon: Icon,
    primary,
    enabled = true,
    size,
    shadowOff,
    onClick,
}: Props) 
{

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    {
        e.stopPropagation()
        onClick?.()
    }

    return (
        <button
            type="button"
            disabled={!enabled}
            onClick={handleClick}
            className={`
                flex flex-row justify-center items-center rounded-lg gap-2 select-none text-text stroke-text transition-colors
                ${!shadowOff && "shadow-sm"}
                ${Icon && !text ? "p-2 aspect-square self-center" : "py-2 px-4"}
                ${primary && enabled && "bg-primary hover:bg-primary-hover"}
                ${!enabled && "bg-transparent text-textmuted shadow-none cursor-not-allowed"}
                ${enabled && "cursor-pointer hover:bg-hover"}
                ${className}
            `}
        >
            { Icon && <Icon size={size} /> }
            { text && <span>{text}</span> }
        </button>
    )
}
