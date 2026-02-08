import { useLayoutEffect, useRef } from "react";


interface Props {
    className?: string
    content?: string
    onTextChange?: (text: string) => void
}


export default function AutoResizeTextarea({className, content, onTextChange}: Props) 
{
    const ref = useRef<HTMLTextAreaElement|null>(null);
    const scrollPositionRef = useRef(0);

    scrollPositionRef.current = window.scrollY;

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => 
    {
        onTextChange?.(e.target.value)
    };

    function resizeToMatchContent()
    {
        if (!ref.current) return

        ref.current.style.height = "auto";
        if (ref.current.scrollHeight > 0) 
        {
             ref.current.style.height = ref.current.scrollHeight + 2 + "px";
        }
    }

    
    useLayoutEffect(() => 
    {
        resizeToMatchContent(); 
        window.scrollTo(0, scrollPositionRef.current);
        
    }, [content]);


    return (
        <textarea
            className={`focus:border-0! focus:outline-0 shadow-inset bg-inset rounded-md py-0.5 px-1 md:p-2 resize-none ${className}`}
            ref={ref}
            onChange={handleInput}
            value={content}
            rows={1}
            spellCheck={false}
        />
    );
}