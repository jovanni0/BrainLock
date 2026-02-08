import { CloudUpload, Download, Plus, Shredder } from "lucide-react";
import { useQuizBuilderStore } from "../stores/quiz-builder-store";
import { exportQBQuiz, generateEmptyAnswer, generateEmptyQuestion, generateEmptyQuiz, QBQuiz2Quiz, saveQuizToLocalRepo } from "../utils/quiz-builder-helpers";
import { useCallback, useEffect, useState } from "react";
import Button from "../components/Button";
import BlankPage from "./Page";
import QuestionDisplay from "../modules/QuestionDisplay";
import QuestionEditor from "../modules/QuestionEditor";
import QuizDetailsCard from "../modules/QuizDetailsCard";
import NoQuestionsPrompt from "../modules/NoQuestionsPrompt";
import { PopupMessage, type PopupMessageProps } from "../components/PopupMessage";
import objectHash from "object-hash";
import Toast from "../components/Toast";



export default function QuizBuilderPage()
{
    /**
     * quiz-builder-store
     */
    const original_hash = useQuizBuilderStore(store => store.originalHash)
    // const setOriginalHash = useQuizBuilderStore(store => store.setOriginalHash)

    const quiz = useQuizBuilderStore(store => store.quiz)
    const setQuiz = useQuizBuilderStore(store => store.setQuiz)
    const updateQuiz = useQuizBuilderStore(store => store.updateQuiz)


    /**
     * component stuff
     */
    const [edited_question_uid, setEditedQuestionUid] = useState<string|undefined>(undefined)
    const [last_edited_question_uid, setLastEditedQuestionUid] = useState<string|undefined>(undefined)
    const [popup_data, setPopupData] = useState<PopupMessageProps|undefined>(undefined)
    const [toast_content, setToastContent] = useState<React.ReactNode|undefined>(undefined)


    /**
     * the edit on the current question has finished
     */
    const onEditStart = useCallback((uid: string) =>
    {
        setLastEditedQuestionUid(edited_question_uid)
        setEditedQuestionUid(uid)
    }, [edited_question_uid, setEditedQuestionUid, setLastEditedQuestionUid])


    /**
     * the edit on the current question has finished
     */
    const onEditFinished = () =>
    {
        setLastEditedQuestionUid(edited_question_uid)
        setEditedQuestionUid(undefined)
    }



    /**
     * if there is no quiz in the builder store, create an empty one
     */
    useEffect(() =>
    {
        if (quiz) return

        const empty_quiz = generateEmptyQuiz()
        setQuiz(empty_quiz)
        onEditStart(empty_quiz.questions[0].id)
    }, [quiz, setQuiz, onEditStart])


    // ################################
    //      QUIZ INFO STUFF
    // ################################

    /**
     * set a new title for the quiz.
     * @param title the new title of the quiz.
     */
    const onTitleChange = (title: string) => 
    {
        updateQuiz(prev => ({...prev, title}));
    };


    /**
     * set a new description for the quiz.
     * @param description the new description of the quiz.
     */
    const onDescriptionChange = (description: string) => 
    {
        updateQuiz(prev => ({...prev, description}));
    };


    /**
     * set a new contributors callout for the quiz.
     * @param title the new contributors callout of the quiz.
     */
    const onContributorsChange = (contributors: string) => 
    {
        updateQuiz(prev => ({...prev, contributors}));
    };


    /**
     * set a new topics list for the quiz.
     * @param title the new topics list for the quiz.
     */
    const onTopicsChange = (topics: string[]) => 
    {
        updateQuiz(prev => ({...prev, topics}));
    };


    // ################################
    //      QUESTION STUFF
    // ################################

    const addQuestion = () => 
    {
        const new_question = generateEmptyQuestion()

        updateQuiz(prev => ({
            ...prev,
            questions: [...prev.questions, new_question]
        }))
        
        onEditStart(new_question.id)
    }


    /**
     * handle the deletion of a question.
     * @param uid the `id` of the question to be deleted.
     */
    const onQuestionDelete = (uid: string) =>
    {
        setPopupData({
            message: "Do you want delete this question?",
            onYes: () => 
            { 
                updateQuiz(prev => ({
                    ...prev,
                    questions: prev.questions.filter(q => q.id !== uid)
                }))
                setPopupData(undefined)
            },
            onNo: () => 
            { 
                setPopupData(undefined)
            }
        })
    }


    /**
     * handle the deletion of a question.
     * @param uid the `id` of the question to be deleted.
     */
    const onQuestionTextChange = (uid: string, text: string) =>
    {
        updateQuiz(prev => ({
            ...prev,
            questions: prev.questions.map(q => 
                q.id === uid ? { ...q, text } : q
            )
        }));
    }


    /**
     * handle the deletion of a question.
     * @param uid the `id` of the question to be deleted.
     */
    const onQuestionTopicChange = (uid: string, topic: string) =>
    {
        updateQuiz(prev => ({
            ...prev,
            questions: prev.questions.map(q => 
                q.id === uid ? { ...q, topic } : q
            )
        }));
    }


    /**
     * handle the deletion of a question.
     * @param uid the `id` of the question to be deleted.
     */
    const onQuestionToggleAnswer = (q_uid: string, a_uid: string) =>
    {
        updateQuiz(prev => ({
            ...prev,
            questions: prev.questions.map(q => 
                q.id === q_uid 
                ? {
                    ...q,
                    answers: q.answers.map(a => 
                        a.id === a_uid 
                        ? { ...a, correct: !a.correct } 
                        : a
                    )
                }
                : q
            )
        }));
    }


    /**
     * handle the deletion of a question.
     * @param uid the `id` of the question to be deleted.
     */
    const onQuestionAnswerChange = (q_uid: string, a_uid: string, text: string) =>
    {
        updateQuiz(prev => ({
            ...prev,
            questions: prev.questions.map(q => 
                q.id === q_uid 
                ? {
                    ...q,
                    answers: q.answers.map(a => 
                        a.id === a_uid 
                        ? { ...a, text } 
                        : a
                    )
                }
                : q
            )
        }));
    }


    /**
     * handle the deletion of a question.
     * @param uid the `id` of the question to be deleted.
     */
    const onQuestionTrashAnswer = (q_uid: string, a_uid: string) =>
    {
        updateQuiz(prev => ({
            ...prev,
            questions: prev.questions.map(q => 
                q.id === q_uid 
                ? {
                    ...q,
                    answers: q.answers.filter(a => a.id !== a_uid)
                }
                : q
            )
        }));
    }


    /**
     * handle the deletion of a question.
     * @param uid the `id` of the question to be deleted.
     */
    const onQuestionAddAnswer = (uid: string) =>
    {
        updateQuiz(prev => ({
            ...prev,
            questions: prev.questions.map(q => 
                q.id === uid 
                ? {
                    ...q,
                    answers: [...q.answers, generateEmptyAnswer()]
                }
                : q
            )
        }));
    }


    /**
     * handle the deletion of a question.
     * @param uid the `id` of the question to be deleted.
     */
    const onQuestionExplanationChange = (uid: string, text: string) =>
    {
        updateQuiz(prev => ({
            ...prev,
            questions: prev.questions.map(q => 
                q.id === uid ? { ...q, explanation: text } : q
            )
        }));
    }


    // ################################
    //      QUIZ MANAGEMENT STUFF
    // ################################

    const onQuizShred = useCallback(() =>
    {
        setPopupData({
            message: "Do you want delete this quiz?",
            onYes: () => 
            { 
                const empty_quiz = generateEmptyQuiz()
                setQuiz(empty_quiz)
                onEditStart(empty_quiz.questions[0].id)
                setPopupData(undefined)
            },
            onNo: () => 
            { 
                setPopupData(undefined)
            }
        })
        
    }, [onEditStart, setQuiz])


    const onQuizExport = useCallback(() => 
    {
        if (!quiz) return

        exportQBQuiz(quiz)
    }, [quiz])


    const onQuizPush2LocalRepo = useCallback(() =>
    {
        if (!quiz) return;

        const normal_quiz = QBQuiz2Quiz(quiz)
        const hash = objectHash(normal_quiz);

        if (original_hash && original_hash !== hash) 
        {
            setPopupData({
                message: "Do you want to override the original quiz?",
                onYes: () => 
                { 
                    saveQuizToLocalRepo(normal_quiz, hash, true)
                    setPopupData(undefined)
                    setToastContent(<span>Succesfully overrode the quiz!</span>)
                },
                onNo: () => 
                { 
                    saveQuizToLocalRepo(normal_quiz, hash, false)
                    setPopupData(undefined)
                    setToastContent(<span>Succesfully saved new quiz!</span>)
                }
            });
        } 
        else 
        {
            saveQuizToLocalRepo(normal_quiz, hash, false);
            setToastContent(<span>Succesfully updated the quiz!</span>)
        }
    }, [quiz, original_hash])


    return (
        <BlankPage
            callout="Quiz Builder"
            description="Build your custom quiz from scratch."
            className="flex-col gap-6"
            backRoute="/local"
        >
            <div className="flex flex-row bg-outset p-3 rounded-2xl gap-2">
                <Button
                    svgIcon={Shredder}
                    size={18}
                    className="bg-outset"
                    onClick={onQuizShred}
                />
                <Button
                    svgIcon={Download}
                    size={18}
                    className="bg-outset"
                    onClick={onQuizExport}
                    enabled={ quiz !== undefined }
                />
                <Button
                    svgIcon={CloudUpload}
                    size={18}
                    className="bg-outset!"
                    onClick={onQuizPush2LocalRepo}
                />
            </div>

            <QuizDetailsCard
                title={quiz?.title}
                description={quiz?.description}
                contributors={quiz?.contributors}
                topics={quiz?.topics}
                onTitleChange={onTitleChange}
                onDescriptionChange={onDescriptionChange}
                onContributorsChange={onContributorsChange}
                onTopicsChange={onTopicsChange}
            />

            <div className="flex flex-col rounded-2xl bg-bg shadow-sm overflow-clip">
                <div className="flex flex-col bg-outset p-4 md:p-6 shadow-sm">
                    <div className="text-xl">Questions &amp; Answers</div>
                    <div className="text-textmuted">Add questions and answers to your quiz</div>
                </div>

                <div className="flex flex-col gap-2 md:gap-4 p-4 md:p-6">
                {
                    quiz?.questions.map((question, q_index) =>

                        question.id === edited_question_uid 
                        ? <QuestionEditor 
                            key={question.id}
                            questionNo={q_index + 1}
                            question={question.text} 
                            answers={question.answers} 
                            topic={question.topic} 
                            explanation={question.explanation}
                            topics={quiz.topics}
                            onEditFinished={onEditFinished} 
                            onDelete={ () => onQuestionDelete(question.id) }
                            onTextChange={ (text) => onQuestionTextChange(question.id, text) }
                            onTopicChange={ (topic) => onQuestionTopicChange(question.id, topic) }
                            onToggleAnswer={ (uid) => onQuestionToggleAnswer(question.id, uid) }
                            onAnswerChange={ (uid, text) => onQuestionAnswerChange(question.id, uid, text) }
                            onTrashAnswer={ (uid) => onQuestionTrashAnswer(question.id, uid) }
                            addAnswer={ () => onQuestionAddAnswer(question.id) }
                            onExplanationChange={ (text) => onQuestionExplanationChange(question.id, text) }
                        />
                        : <QuestionDisplay 
                            key={question.id}
                            questionNo={q_index + 1}
                            question={question.text} 
                            answers={question.answers} 
                            topic={question.topic} 
                            explanation={question.explanation}
                            onEdit={ () => onEditStart(question.id) } 
                            onDelete={ () => onQuestionDelete(question.id) }
                            highlite={ question.id === last_edited_question_uid }
                            className="bg-bglight"
                        />
                    )
                }

                {
                    quiz?.questions.length == 0
                    ? <NoQuestionsPrompt
                        onClick={addQuestion}
                    />
                    : <Button 
                        primary 
                        text="Add Question" 
                        svgIcon={Plus} 
                        onClick={addQuestion}
                    />
                }
                </div>
            </div>

            <Toast 
                onClose={() => setToastContent(undefined)} 
                children={toast_content} 
            />

            { popup_data && <PopupMessage {...popup_data} /> }
        </BlankPage>
    )
}