import { Plus, Trash2 } from "lucide-react";
import AutoResizeTextarea from "../components/AutoResizeTextarea";
import Button from "../components/Button";


interface Props {
    title?: string
    description?: string
    contributors?: string
    topicInput?: string
    topics?: string[]

    titleWarning?: boolean
    topicWarning?: boolean

    onTitleChange?: (text: string) => void
    onDescriptionChange?: (text: string) => void
    onContributorsChange?: (text: string) => void
    onTopicInputChange?: (text: string) => void
    onAddTopic?: () => void
    onTrashTopic?: (topic: string) => void
}


const QuizDetailsEditor = (
    {
        title, description, contributors, topicInput, topics,
        titleWarning, topicWarning,
        onTitleChange, onDescriptionChange, onContributorsChange, onTopicInputChange, onAddTopic, onTrashTopic
    }: Props
) =>
{
    return (
        <div className="flex flex-col gap-2 md:gap-4">
            <div className="flex flex-col gap-1">
                <div className="flex flex-col md:flex-row md:gap-2 justify-between">
                    <span>Quiz Title</span>
                    { 
                        titleWarning && 
                        <div className="text-danger">You need to provide a title to the quiz!</div> 
                    }
                </div>
                
                <AutoResizeTextarea 
                    content={title} 
                    onTextChange={ (e) => onTitleChange?.(e) } 
                />
            </div>

            <div className="flex flex-col gap-1">
                <span>Description</span>
                <AutoResizeTextarea 
                    content={description} 
                    onTextChange={onDescriptionChange} 
                />
            </div>

            <div className="flex flex-col gap-1">
                <span>Contributors</span>
                <AutoResizeTextarea 
                    content={contributors} 
                    onTextChange={onContributorsChange} 
                />
            </div>
            
            <div className="flex flex-col gap-1.5">
                <div className="flex flex-col md:flex-row justify-between">
                    <span>Topics</span>
                    { 
                        topicWarning && 
                        <div className="text-danger">This topic already exists or is an empty string!</div> 
                    }
                </div>

                <div className="flex flex-row gap-2 md:gap-4">
                    <input 
                        value={topicInput} 
                        onChange={(e) => onTopicInputChange?.(e.target.value) }
                        className="focus:border-0! focus:outline-0 shadow-inset bg-inset rounded-md p-2 resize-none flex-1 min-w-2"
                    />
                    
                    <Button 
                        primary 
                        text="Add" 
                        svgIcon={Plus} 
                        onClick={onAddTopic}
                        enabled={!topicWarning}
                    />
                </div>

                <div className="flex flex-wrap gap-1">
                {
                    topics?.map( topic => 
                        <div 
                            key={topic}
                            className="flex flex-row gap-1 justify-center items-center rounded-xl p-1 pl-2 shadow-sm"
                        >
                            <span>{topic}</span>

                            <Button 
                                shadowOff 
                                svgIcon={Trash2} 
                                size={16} 
                                className="p-1!" 
                                onClick={() => onTrashTopic?.(topic)} 
                            />
                        </div>
                    )
                }
                </div>
            </div>
        </div>
    )
}

export default QuizDetailsEditor