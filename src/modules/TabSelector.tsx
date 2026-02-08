import { memo } from "react"


interface Props {
    tabs?: string[],
    selectedIndex?: number,
    onTabIndexChanged?: (arg0: number) => void
}


const TabSelector = (
    {
        tabs = [ "Tab1", "Tab2", "Tab3", "Tab4" ],
        selectedIndex = 0,
        onTabIndexChanged
    }: Props
) =>
{
    return (
        <div className="flex flex-row bg-bg shadow-sm p-1 rounded-4xl">
        {
            tabs.map( (item, index) => 
                <div 
                    key={item}
                    onClick={ () => onTabIndexChanged?.(index) }
                    className={`
                        rounded-4xl flex-1 px-2 py-1 text-center cursor-pointer text-sm md:text-base 
                        ${index === selectedIndex ? "bg-bglight shadow-sm" : ""} 
                    `}
                >
                    { item }
                </div> 
            )
        }
        </div>
    )
}

export default memo(TabSelector)