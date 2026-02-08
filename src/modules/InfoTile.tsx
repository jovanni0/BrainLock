import { memo } from "react"


interface Props {
    title?: string,
    children?: React.ReactNode
    className?: string
}


const InfoTile = (
    {
        title,
        children,
        className = ""
    }: Props
) =>
{
    return(
        <div className={`flex flex-col justify-center rounded-2xl bg-bg shadow-sm px-6 py-3 flex-1 ${className}`}>
            <span>{ title }</span>
        {
            children
        }
        </div>
    )
}

export default memo(InfoTile)