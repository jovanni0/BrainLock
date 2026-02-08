import { useEffect, useState } from "react";

interface Props {
    duration?: number
    onClose?: () => void
    children?: React.ReactNode
}

export default function Toast(
    { 
        duration = 3000, 
        onClose,
        children
    } : Props)
{
    const [visible, setVisible] = useState(false);

    useEffect( () => 
    {
        if (!children) return;

        setVisible(true);

        const timeout = setTimeout(() => 
        {
            setVisible(false);

            // Allow fade-out to complete before calling onClose
            setTimeout(() => onClose?.(), 300);
        }, duration);

        return () => clearTimeout(timeout);
    }, [children, duration, onClose]);

    if (!children) return null;

    return (
        <div
            className={
                `fixed bottom-5 right-5 p-4 rounded-lg text-text transition-all duration-300 ease-in-out transform 
                ${ visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"}`}
            style={{ transitionDelay: "0s, 0.3s" }}
        >
            <div className="bg-bg p-3 rounded-lg shadow-sm">{children}</div>
        </div>
    );
}
