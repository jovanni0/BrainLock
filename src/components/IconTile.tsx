interface Props
{
    size?: number
    icon?: React.ElementType
    shade?: string
    className?: string
}


export default function IconTile(
    {
        size, 
        icon: Icon, 
        shade,
        className = ""
    }: Props)
{
    return (
        <div 
            className={`relative flex justify-center items-center p-3 bg-bglight shadow-sm aspect-square w-fit rounded-lg ${className}`}
            onClick={(e) => e.stopPropagation()}
        >
            {
                Icon 
                && <Icon size={size} /> 
            }
            {
                shade 
                && <div className={`absolute left-0 top-0 right-0 bottom-0 rounded-lg ${shade}`}/>
            }
        </div>
    )
}