import { memo } from "react"


const Spinner = () =>
{
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="h-8 w-8 border-4 border-textprimary border-t-transparent rounded-full animate-spin" />
        </div>
    )
}

export default memo(Spinner)