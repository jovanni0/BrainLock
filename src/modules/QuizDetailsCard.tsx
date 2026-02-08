import { memo, useState } from "react";
import Button from "../components/Button";
import { Check, Pencil } from "lucide-react";
import QuizDetailsEditor from "./QuizDetailsEditor";
import QuizDetailsDisplay from "./QuizDetailsDisplay";


interface Props {
    title?: string
    description?: string
    contributors?: string
    topics?: string[]

    onTitleChange?: (text: string) => void
    onDescriptionChange?: (text: string) => void
    onContributorsChange?: (text: string) => void
    onTopicsChange?: (topics: string[]) => void
}


const QuizDetailsCard = (
    {
        title, description, contributors, topics,
        onTitleChange, onDescriptionChange, onContributorsChange, onTopicsChange
    }: Props
) =>
{
    const [is_edit, setIsEdit] = useState<boolean>(title?.trim() === "")
    const [topic_input, setTopicInput] = useState<string>("")

    const title_warning = title?.trim() === ""
    const topic_warning = (topic_input.trim() === "" || topics?.some(t => t === topic_input.trim())) ?? false


    /**
     * adds a new topic to the list if it does not exist
     */
    const onAddTopic = () =>
    {
        if (topic_warning) return

        if (!topics)
        {
            onTopicsChange?.([topic_input.trim()])
            setTopicInput("")
            return
        }

        onTopicsChange?.([...topics, topic_input.trim()])
        setTopicInput("")
    }


    /**
     * remove the specified topic from the array
     */
    const onTrashTopic = (topic: string) =>
    {
        const remaining = topics?.filter(t => t !== topic) ?? []

        onTopicsChange?.(remaining)
    }


    /**
     * triggered when the end edit button is pressed. checks for a correct title.
     */
    const validateInfo = () =>
    {
        if (title_warning) return

        setIsEdit(false)
        setTopicInput("")
    }



    return (
        <div className="flex flex-col rounded-2xl bg-bg shadow-sm overflow-clip">
            <div className="flex flex-row justify-between items-center bg-bglight p-4 md:p-6 shadow-sm">
                <div>
                    <div className="text-xl">Quiz Details</div>
                    <div className="text-textmuted">Basic information about your quiz</div>
                </div>
                <div className="grid grid-cols-2 md:flex flex-row">
                {
                    is_edit 
                    ? <Button 
                        svgIcon={Check} 
                        size={20} 
                        shadowOff 
                        onClick={validateInfo} 
                        enabled={!title_warning}
                    />
                    : <Button 
                        svgIcon={Pencil} 
                        size={20} 
                        shadowOff 
                        onClick={ () => setIsEdit(true) }
                    />
                }
                </div>
            </div>
            
            <div className="flex flex-col p-4 md:p-6">
            { 
                
                is_edit 
                ? <QuizDetailsEditor
                    title={title}
                    description={description}
                    contributors={contributors}
                    topicInput={topic_input}
                    topics={topics}
                    titleWarning={title_warning}
                    topicWarning={topic_warning}
                    onTitleChange={onTitleChange}
                    onDescriptionChange={onDescriptionChange}
                    onContributorsChange={onContributorsChange}
                    onTopicInputChange={setTopicInput}
                    onAddTopic={onAddTopic}
                    onTrashTopic={onTrashTopic}
                />

                : <QuizDetailsDisplay
                    title={title}
                    description={description}
                    contributors={contributors}
                    topics={topics}
                />
            }
            </div>
        </div>
    )
}

export default memo(QuizDetailsCard)