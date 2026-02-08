import { useLocalMetadataStore, useLocalQuizStore, useTargetQuizStore, useUsageModeStore } from "../store.js";
import { useQuizBuilderStore } from "../stores/quiz-builder-store.js";
import { useCallback, useRef, useState } from "react";
import type { Quiz, QuizMetadata } from "../types/quiz-types.js";
import { useNavigate } from "react-router";
import { PopupMessage, type PopupMessageProps } from "../components/PopupMessage.js";
import { hashAndGetMetadata, QBQuizIsEmpty, uploadQuizFile } from "../utils/quiz-helpers.js";
import QuizCard from "../components/QuizCard.js";
import UploadOrCreateCard from "../modules/UploadOrCreateCard.js";
import BlankPage from "./Page.js";
import Toast from "../components/Toast.js";
import { QBQuiz2Quiz, Quiz2QBQuiz } from "../utils/quiz-builder-helpers.js";
import { getQuizMetadata } from "../utils/quiz-metadata.js";


export default function LocalQuizzesPage()
{
    const input_ref = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate()

    //-------------------
    // local-quiz-store
    //-------------------
    const local_quizzes = useLocalQuizStore(store => store.quizzes)
    const addQuizToLocalStore = useLocalQuizStore(store => store.addQuiz)
    const removeLocalQuiz = useLocalQuizStore(store => store.removeQuiz)


    //-------------------
    // local-metadata-store
    //-------------------
    const quizzes_metadata = useLocalMetadataStore(store => store.quizzesMedatata)
    const setLocalMetadataStore = useLocalMetadataStore(store => store.update)
    const setQuizMetadataToLocalStore = useLocalMetadataStore(store => store.updateMetadata)
    const removeLocalMetadata = useLocalMetadataStore(store => store.removeMetadata)


    //-------------------
    // quiz-builder-store
    //-------------------
    const quiz_in_builder = useQuizBuilderStore(store => store.quiz)
    const original_hash = useQuizBuilderStore(store => store.originalHash)
    const setQuizInBuilder = useQuizBuilderStore(store => store.setQuiz)
    const setOriginalHashInBuilder = useQuizBuilderStore(store => store.setOriginalHash)

    //-------------------
    // other stores
    //-------------------
    const setTargetQuizHash = useTargetQuizStore(state => state.setHash)
    const setUsageMode = useUsageModeStore(store => store.setUsageMode)

    //-------------------
    // local states
    //-------------------
    const [toast_content, setToastContent] = useState<React.ReactNode|undefined>(undefined)
    const [popup_data, setPopupData] = useState<PopupMessageProps|undefined>(undefined)



    /**
     * load the selected quiz in the builder for editing.
     * @param hash the hash of the selected quiz.
     */
    function loadQuizForEdit(hash: string)
    {
        const quiz = local_quizzes.find(q => q.hash === hash);

        if (!quiz) 
        {
            console.log(`ERROR: could not find quiz by hash (${hash})`)
            return;
        }

        const qb_quiz = Quiz2QBQuiz(quiz)

        saveQuizInBuilder();
        setQuizInBuilder(qb_quiz);
        setOriginalHashInBuilder(quiz.hash);
        navigate("/quiz-builder");
    }


    /**
     * save the quiz from the builder in the local repo.
     */
    function saveQuizInBuilder()
    {
        if (!quiz_in_builder || QBQuizIsEmpty(quiz_in_builder)) return;

        const normal_quiz = QBQuiz2Quiz(quiz_in_builder)
        const { quiz, metadata } = hashAndGetMetadata(normal_quiz);

        addQuizToLocalStore(quiz);
        setQuizMetadataToLocalStore(metadata);
    }


    /**
     * save the quiz as a new quiz in the local repo.
     * @param quiz the quiz to be saved.
     * @param metadata the metadata of the quiz.
     */
    function saveAsNew(quiz: Quiz, metadata: QuizMetadata)
    {
        addQuizToLocalStore(quiz);
        setQuizMetadataToLocalStore(metadata);
        setToastContent("Quiz saved succesfully to local storage!");
    }


    /**
     * override the original quiz with the new one.
     * @param quiz the quiz to be saved.
     * @param metadata the metadata of the quiz.
     */
    function saveAndOverride(quiz: Quiz, metadata: QuizMetadata)
    {
        if (original_hash)
        {
            removeLocalQuiz(original_hash);
            removeLocalMetadata(original_hash);
        }

        saveAsNew(quiz, metadata);
    }


    /**
     * create a new quiz in builder.
     */
    function createNewQuizInBuilder()
    {
        setQuizInBuilder(undefined);
        navigate("/quiz-builder");
    }


    /**
     * show a popup to decide what to do with the quiz in the builder
     */
    function decideWhatToDoWithQuizInBuilder()
    {
        if (!quiz_in_builder || QBQuizIsEmpty(quiz_in_builder))
        {
            createNewQuizInBuilder();
            return;
        }

        const normal_quiz = QBQuiz2Quiz(quiz_in_builder)
        const { quiz, metadata } = hashAndGetMetadata(normal_quiz);

        if (!original_hash)
        {
            saveAsNew(quiz, metadata);
            return;
        }

        if (original_hash !== quiz.hash)
        {
            setPopupData({
                message: "Do you want to override the original quiz?",
                onYes: () =>
                {
                    saveAndOverride(quiz, metadata);
                    setPopupData(undefined);
                    createNewQuizInBuilder();
                },
                onNo: () =>
                {
                    saveAsNew(quiz, metadata);
                    setPopupData(undefined);
                    createNewQuizInBuilder();
                }
            });
            return;
        }

        createNewQuizInBuilder();
    }


    /**
     * handles the upload of a quiz file
     */
    const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        const files = event.target.files;
        
        if (!files || !files.length) return;

        const file = files[0]

        const parsedQuiz = await uploadQuizFile(file)

        if (!parsedQuiz)
        {
            console.log("ERROR: eroare la parsarea quiz-ului")
            setToastContent(<div className="text-textdanger">Error parsing the file.</div>)
            return
        }

        const metadata = getQuizMetadata(parsedQuiz)
        const added = addQuizToLocalStore(parsedQuiz)

        if (!added)
        {
            console.log("INFO: quiz already exists, did not add")
            setToastContent(<div>This quiz already exists.</div>)
            return
        }

        setLocalMetadataStore([...quizzes_metadata, metadata])

        const handleClick = () => 
        {
            const json = JSON.stringify(parsedQuiz, null, 2);
            const newWindow = window.open("", "_blank");

            if (newWindow) 
            {
                newWindow.document.write(`<pre style="white-space: pre-wrap; font-size: 14px;">${json}</pre>`);
            }
        };
        setToastContent(<span>Click <a onClick={handleClick} style={{cursor: "pointer", textDecoration: "underline"}}>here</a> to view JSON.</span>)

        /** 
         * make sure to clear the input filed, otherwise it will not let you upload the same file,
         * for example if you uploadd quiz1, then delete quiz1 and try to upload it again, it will
         * not work because the same URI is in the input and it is triggered on `onChange`.
        */
        if (input_ref.current) 
        {
            input_ref.current.value = "";
        }

    }, [quizzes_metadata, addQuizToLocalStore, setLocalMetadataStore])


    /**
     * delete a quiz from local repo
     * @param quiz_hash the has of the quiz to be deleted
     */
    const deleteQuiz = useCallback((quiz_hash: string) =>
    {
        removeLocalMetadata(quiz_hash)
        removeLocalQuiz(quiz_hash)
    }, [removeLocalMetadata, removeLocalQuiz])


    /**
     * customize selected quiz
     */
    const customizeQuiz = useCallback((hash: string) =>
    {
        setUsageMode("local");
        setTargetQuizHash(hash); 
        navigate("/customize")
    }, [setUsageMode, setTargetQuizHash, navigate])

   
    return (
        <BlankPage
            callout="Your Quizzes"
            description="Upload or select from your quizzes"
            className="flex-col gap-2 md:gap-4"
            backRoute="/"
        >
            <div className={
                `flex items-center justify-center border-2 border-dashed border-textmuted rounded-2xl p-4 md:px-12 md:py-6
                ${quizzes_metadata.length === 0 ? "h-full" : "h-fit"}`
            }>
                <UploadOrCreateCard
                    isQuiz={ quizzes_metadata.length === 0 }
                    onUpload={ () => input_ref?.current?.click() }
                    onCreate={decideWhatToDoWithQuizInBuilder}
                />
                
                <input ref={input_ref} type="file" id="fileInput" accept=".blmx" style={{ display: "none" }} onChange={handleFileUpload} multiple={false}/>
            </div>

            {
                quizzes_metadata.map( quiz =>
                    <QuizCard 
                        key={quiz.hash}
                        title={quiz.title}
                        description={quiz.description}
                        topics={quiz.topics.map(topic => topic.name)}
                        questionNumber={quiz.questionNo}
                        onClick={() => customizeQuiz(quiz.hash)}
                        onTrash={() => deleteQuiz(quiz.hash)}
                        onEdit={() => loadQuizForEdit(quiz.hash)}
                    />
                )
            }

            <Toast 
                onClose={() => setToastContent(undefined)} 
                children={toast_content}
            />
            { popup_data && <PopupMessage {...popup_data} /> }
        </BlankPage>
    );
}