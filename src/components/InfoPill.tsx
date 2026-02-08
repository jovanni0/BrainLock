interface Props {
    text?: string
    shadowOff?: boolean
    className?: string
}


export default function InfoPill(
    {
        text,
        shadowOff,
        className = ""
    }: Props
)
{
    return (
        <div className={`flex rounded-lg px-2 py-0.5 content-center items-center justify-center text-xs md:text-sm h-fit bg-bg
                      ${ !shadowOff && "shadow-sm"}
                      ${className}`}
            onClick={(e) => e.stopPropagation()}
        >
            { text }
        </div>
    );
}