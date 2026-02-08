import Button from "./Button"
import { Trash2 } from "lucide-react"

interface Props {
    topics1?: string[]
    topics2?: string[]
    onSetTopics1: React.Dispatch<React.SetStateAction<string[] | undefined>>
    onSetTopics2: React.Dispatch<React.SetStateAction<string[] | undefined>>
}


export default function QuizSplitter({ topics1, topics2, onSetTopics1, onSetTopics2 }: Props)
{
    return (
        <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-8 flex-1 p-4 bg-bg rounded-lg shadow-sm">
                <div>Topics for Quiz 1</div>
                <div className="flex flex-col gap-2">
                { 
                    topics1?.map( (topic, t_index) =>
                        <div
                            key={t_index}
                            className="flex flex-row gap-1 justify-between items-center rounded-xl p-1 px-2 bg-bglight shadow-sm"
                        >
                            <div>{ topic }</div>
                            <Button 
                                shadowOff 
                                svgIcon={Trash2} 
                                size={16} 
                                className="p-1!" 
                                onClick={ () => onSetTopics1(prev => prev?.filter( (_, ti) => ti !== t_index)) }
                            />
                        </div>
                    )
                }
                </div>
            </div>

            <div className="flex flex-col gap-8 flex-1 p-4 bg-bg rounded-lg shadow-sm">
                <div>Topics for Quiz 2</div>
                <div className="flex flex-col gap-2">
                { 
                    topics2?.map( (topic, t_index) =>
                        <div
                            key={t_index}
                            className="flex flex-row gap-1 justify-between items-center rounded-xl p-1 px-2 bg-bglight shadow-sm"
                        >
                            <div>{ topic }</div>
                            <Button 
                                shadowOff 
                                svgIcon={Trash2} 
                                size={16} 
                                className="p-1!" 
                                onClick={ () => onSetTopics2(prev => prev?.filter( (_, ti) => ti !== t_index)) }
                            />
                        </div>
                    )
                }
                </div>
            </div>
        </div>
    )
}