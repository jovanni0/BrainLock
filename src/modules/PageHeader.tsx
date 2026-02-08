import { ArrowLeft, Moon, Settings2, Sun } from "lucide-react"
import Button from "../components/Button"
import { memo } from "react"


interface Props {
    title?: string
    description?: string
    isDarkTheme?: boolean
    disableNav?: boolean
    backIcon?: React.ElementType
    showSettings?: boolean
    onBackNav?: () => void
    onToggleTheme?: () => void
    onSettingsNav?: () => void
}


const PageHeader = (
    {
        title, description,
        isDarkTheme,
        disableNav = false,
        backIcon: Icon = ArrowLeft,
        showSettings,
        onBackNav,
        onToggleTheme,
        onSettingsNav
    }: Props
) =>
{
    return (
        <div className="flex bg-bg w-full justify-center shadow-bottom">
            <div className="flex flex-row w-full justify-between items-center gap-2 p-4 sticky top-0 md:w-4/5 md:px-0">
                <div className="flex flex-row gap-2">
                    <Button 
                        shadowOff 
                        enabled={!disableNav} 
                        svgIcon={Icon} 
                        onClick={onBackNav}
                    />

                    <div className="flex flex-col justify-center">
                        <span className="text-lg md:text-2xl">{title}</span>
                        <span className="text-sm text-textmuted md:text-base">{description}</span>
                    </div>
                </div>

                <div className="flex flex-row">
                    <Button 
                        shadowOff 
                        svgIcon={ isDarkTheme ? Moon : Sun }
                        onClick={onToggleTheme} 
                    />

                {
                    showSettings &&
                    <Button 
                        shadowOff 
                        svgIcon={Settings2} 
                        onClick={onSettingsNav} 
                    />
                }
                </div>
            </div>
        </div>
    )
}

export default memo(PageHeader)