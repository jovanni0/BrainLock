import { memo } from "react"
import IconTile from "../components/IconTile"


interface Props {
    title?: string,
    description?: string,
    children?: React.ReactNode,
    className?: string,
    svgIcon?: React.ElementType,
    iconColor?: string,
    iconBackgroundShade?: string
}


const SettingCard = (
    {
        title = "Title",
        description = "Description",
        svgIcon: Icon,
        className,
        children,
        iconColor,
        iconBackgroundShade
    }: Props 
) => 
{
    return (
        <div className="flex flex-col bg-bg shadow-sm rounded-2xl p-4 gap-4">
            <div className="flex flex-row gap-4 items-center">
                <IconTile 
                    icon={Icon} 
                    className={iconColor}
                    shade={iconBackgroundShade}
                />
                <div>
                    <div className="text-lg">{title}</div>  
                    <div className="text-textmuted">{description}</div>
                </div>
            </div>
            <div className={className}>{children}</div>
        </div>
    )
}

export default memo(SettingCard)