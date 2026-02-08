

interface Props {
    title?: string
    description?: string
    contributors?: string
    topics?: string[]
    className?: string
}


const QuizDetailsDisplay = (
    {
        title, description, contributors, topics
    }: Props
) =>
{
    return (
        <div className="flex flex-col gap-2 md:gap-4">
            <div className="flex flex-col">
                <div className="text-textmuted">Quiz Title</div>
                <div>{title}</div>
            </div>

        {
            description !== "" &&
            <div className="flex flex-col">
                <div className="text-textmuted">Description</div>
                <div>{description}</div>
            </div>
        }

        {
            contributors !== "" &&
            <div className="flex flex-col">
                <div className="text-textmuted">Contributors</div>
                <div>{contributors}</div>
            </div>
        }

        {
            topics && topics.length > 0 &&
            <div className="flex flex-col">
                <div className="text-textmuted">Topics</div>

                <div className="flex flex-wrap gap-1">
                {
                    topics.map( topic => 
                        <div
                            key={topic} 
                            className="shadow-sm px-2 py-0.5 rounded-lg"
                        >
                            {topic}
                        </div>
                    )
                }
                </div>
            </div>
        }
        </div>
    )
}

export default QuizDetailsDisplay