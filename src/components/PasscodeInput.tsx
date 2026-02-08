import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";


interface Props {
    className?: string
}


export default function PasscodeInput(
    {
        className = ""
    }: Props)
{
    const [isShowing, setIsShowing] = useState(false);

    return (
        <div className={`flex relative w-full ${className}`}>
            <input
                type={isShowing ? "text" : "password"}
                placeholder="Passcode"
                className="inline-block w-full px-4 py-2 border border-secondary rounded-lg text-text-secondary relative"
                id="server-auth-passcode"
            />
            
            <div
                className="flex items-center absolute top-1/2 right-2 cursor-pointer pointer-events-auto -translate-y-1/2"
                onClick={() => setIsShowing((prev) => !prev)}
            >
                { 
                    isShowing ? <EyeOff className="text-secondary w-4 h-4 pointer-events-none" /> 
                    : <Eye className="text-secondary w-4 h-4 pointer-events-none" /> 
                }
            </div>
        </div>
    );
}