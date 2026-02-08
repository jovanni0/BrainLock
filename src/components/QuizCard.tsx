import { BookOpen, Pencil, Trash2 } from "lucide-react"
import InfoPill from "./InfoPill.js"
import Button from "./Button.js"
import IconTile from "./IconTile.js"


interface Props {
    title?: string,
    description?: string,
    className?: string,
    topics?: string[],
    questionNumber?: number,
    onTrash?: () => void,
    onClick?: () => void
    onEdit?: () => void
}


export default function QuizCard(
    {
        title,
        description,
        className = "",
        topics = [],
        questionNumber = 0,
        onTrash,
        onClick,
        onEdit
    }: Props)
{
    return (
        <div 
            onClick={onClick} 
            className={`flex bg-bg shadow-sm rounded-2xl cursor-pointer ${className}`}
        >
            {/* CUSTOM TABLET+DESKTOP DISPLAYS */}
            <div className="hidden md:flex flex-col gap-2 p-6 justify-between w-full">
                <div className="flex flex-row gap-2 items-center">
                    <IconTile icon={BookOpen} />
                    <div className="flex-1">{title}</div>
                    <InfoPill text={`${questionNumber} questions`}/>

                    <div className="flex flex-row">
                        {
                            onEdit
                            && <Button 
                                shadowOff 
                                svgIcon={Trash2} 
                                onClick={onTrash} 
                                size={16} 
                            />
                        }
                        {
                            onTrash
                            && <Button 
                                shadowOff 
                                svgIcon={Pencil} 
                                onClick={onEdit} 
                                size={16} 
                            />
                        }
                    </div>
                </div>

                <div className="text-textmuted">{description}</div>

                {
                    topics.filter(x => x.toLowerCase() !== "").length > 0 
                    && <div className="flex flex-row gap-2">
                    {
                        topics
                            .filter(x => x.toLowerCase() !== "")
                            .map( (topic, index) => <InfoPill text={topic} key={index} /> )
                    }
                    </div>
                }
            </div>

            {/* LAYOUT FOR MOBILE */}
            <div className="flex md:hidden flex-row gap-2 justify-between items-center w-full p-4">
                <div className="flex flex-col w-full justify-center gap-2">
                    <div>{title}</div>
                    <div className="text-sm md:text-base text-textmuted">{description}</div>
                    {
                        topics.filter(x => x.toLowerCase() !== "").length > 0 
                        && <div className="flex flex-row gap-2">
                        {
                            topics
                                .filter(x => x.toLowerCase() !== "")
                                .map( (topic, index) => <InfoPill text={topic} key={index} /> )
                        }
                        </div>
                    }
                </div>

                <div className="flex flex-col items-start">
                {
                    onEdit
                    && <Button 
                        shadowOff 
                        svgIcon={Trash2} 
                        onClick={onTrash} 
                        size={16} 
                    />
                }
                {
                    onTrash
                    && <Button 
                        shadowOff 
                        svgIcon={Pencil} 
                        onClick={onEdit} 
                        size={16} 
                    />
                }
                </div>
            </div>
        </div>
    )
}