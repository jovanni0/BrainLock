import { memo } from "react"
import Button from "../components/Button"
import { BookOpen, Upload } from "lucide-react"


interface Props {
    isQuiz?: boolean
    onUpload?: () => void
    onCreate?: () => void
}


const NewQuizCard = (
    {
        isQuiz,
        onUpload,
        onCreate
    }: Props
) =>
{
    return (
        <>
            {/* LAYOUT FOR DESKTOP */}
            <div className="hidden md:flex flex-col justify-center items-center gap-4">
                <div className="inline text-xl">
                    { isQuiz ? "Add quizzes" : "No quizzes here yet" }
                </div>
                
                <div className="inline text-textmuted text-center text-base">
                    Upload a quiz or create one in moments. 
                    <br/> 
                    We support only BLMX files. More details <a href="https://github.com/jovanni0/BrainLock" className="text-blue">here</a>.
                </div>
                
                <div className="flex flex-row gap-4 w-fit pt-2">
                    <Button
                        text="Choose File" 
                        svgIcon={Upload} 
                        onClick={onUpload} 
                        className="bg-bg" 
                    />

                    <Button 
                        primary 
                        text="Create Quiz" 
                        svgIcon={BookOpen} 
                        onClick={onCreate} 
                    />
                </div>
            </div>

            {/* LAYOUT FOR MOBILE */}
            <div className="flex md:hidden flex-col justify-center items-center gap-2">
            {
                isQuiz && 
                <>
                    <div className="text-lg md:text-xl">
                        No quizzes here yet
                    </div>

                    <div className="text-textmuted text-center text-sm">
                        Upload a quiz or create one in moments. 
                        <br/> 
                        We support only BLMX files. More details <a href="https://github.com/jovanni0/BrainLock" className="text-blue">here</a>.
                    </div>
                </>
            }

                <div className={`flex flex-row w-full gap-2 ${isQuiz && "gap-4 pt-2"}`}>
                    <Button 
                        text="Choose File" 
                        svgIcon={Upload} 
                        onClick={onUpload} 
                        className="bg-bg" 
                    />

                    <Button 
                        primary 
                        text="Create Quiz" 
                        svgIcon={BookOpen} 
                        onClick={onCreate} 
                    />
                </div>
            </div>
        </>
    )
}


export default memo(NewQuizCard)