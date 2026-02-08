import BrainLock from "../../public/brainlock.svg?react";
import { useNavigate } from "react-router";
import { MonitorSmartphone, Server } from "lucide-react";
import BlankPage from "./Page";
import SourceSelector from "../modules/SourceSelector";


export default function HomePage()
{
    const navigate = useNavigate()

    return (
        <BlankPage
            callout="Welcome To BrainLock"
            description="Hosting quizzes since 2024"
            backIcon={BrainLock}
            disableNav={true}
            className="flex-col justify-center items-center"
        >
            <div className="flex flex-col gap-4 md:flex-row md:gap-4 lg:gap-20">
                <SourceSelector
                    title="Use Server Quizzes"
                    description="Choose from our selection of pre-made quizzes on various topics."
                    buttonText="Browse"
                    icon={Server}
                    onClick={() => navigate("/server")}
                />

                <SourceSelector
                    title="Use Your Quizzes"
                    description="Upload your quiz files or create new ones. Everything is stored locally."
                    buttonText="Let's Go"
                    icon={MonitorSmartphone}
                    onClick={() => navigate("/local")}
                    isButtonPrimary
                />
            </div>
        </BlankPage>
    );
}