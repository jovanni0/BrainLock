import type { Question, Quiz, QuizMetadata, SelectableTopic } from "../types/quiz-types"
import { shuffle } from "./helpers"
import { BlmxExtractor } from "blmx-parser"
import objectHash from "object-hash";
import MarkdownIt from "markdown-it"
import type { QBQuiz } from "../types/quiz-builder-types";
import { getQuizMetadata } from "./quiz-metadata";


/**
 * prepare the quiz for rendering.
 * @param quiz the quiz to be prepared for rendering.
 * @param topic_preference a list of `SelectableTopic`, containing all selected and unselected topics.
 * @param shuffle_questions `true` to shuffle questions, else `false`.
 * @param shuffle_answers `true` to shuffle answers, else `false`.
 * @param show_all_questions `true` to use all questions in the quiz, else `false`. this works only if `question_batch_size` is a positive number.
 * @param question_batch_size a number indicating how many questions to keep in the quiz. only works if `show_all_questions` is `false`.
 * @returns 
 */
export function prepareQuizForRender(
    quiz: Quiz,
    md_parser?: MarkdownIt,
    topic_preference?: SelectableTopic[],
    shuffle_questions?: boolean,
    shuffle_answers?: boolean,
    show_all_questions?: boolean,
    question_batch_size?: number,
) : Quiz
{
    const prepared_quiz = structuredClone(quiz)

    // filter the topics
    if (topic_preference)
    {
        const selectedTopics = topic_preference
            .filter(t => t.selected)
            .map(t => t.name)

        const filtered_questions = prepared_quiz.questions.filter(
            q => q.topic !== undefined ? selectedTopics.includes(q.topic) : false
        )

        prepared_quiz.questions = filtered_questions
    }

    // shuffle the questions
    if (shuffle_questions)
    {
        const shuffled_questions = shuffle(prepared_quiz.questions)
        prepared_quiz.questions = shuffled_questions
    }

    // shuffle the answers
    if (shuffle_answers)
    {
        prepared_quiz.questions = prepared_quiz.questions.map(
            question => ({...question, answers: shuffle(question.answers)})
        )
    }

    // limit the number of questions
    if (!show_all_questions && question_batch_size)
    {
        const question_batch = prepared_quiz.questions.slice(0, question_batch_size)
        prepared_quiz.questions = question_batch
    }

    if (!md_parser) return prepared_quiz
    
    // convert the raw markdown in html
    const markdown_questions: Question[] = prepared_quiz.questions.map(
        question => ({
            ...question,
            text: renderMarkdown(md_parser, question.text)!,
            answers: question.answers.map(answer => ({...answer, text: renderMarkdown(md_parser, answer.text) ?? ""})),
            explanation: renderMarkdown(md_parser, question.explanation)
        })
    )
    prepared_quiz.questions = markdown_questions

    return prepared_quiz
}


/**
 * render a markdown string as HTML.
 * @param text the markdown to be rendered.
 * @param parser the parser to do the rendering.
 * @returns the HTML resulting form the render.
 */
function renderMarkdown(parser: MarkdownIt, text?: string) : string
{
    if (!text || !parser) return ""

    return parser.render(text)
}


/**
 * read a file and return the contents.
 * @param file the file to be read.
 * @returns the contents of the file.
 */
export function readFile(file: File): Promise<string> 
{
    return new Promise((resolve, reject) => 
    {
        const reader = new FileReader();
        reader.onerror = () => reject(reader.error);
        reader.onload = () => 
        {
            try 
            {
                const fileContents = reader.result as string;

                resolve(fileContents);
            } 
            catch (error) 
            {
                reject(error);
            }
        };
        reader.readAsText(file);
    });
}


export async function uploadQuizFile(file: File): Promise<Quiz|undefined>
{
    try
    {
        const raw_quiz_content = await readFile(file);
        const blmx_parser = new BlmxExtractor(raw_quiz_content)
        const parsed_quiz = blmx_parser.extractQuiz()

        const hash = objectHash(parsed_quiz)

        return { ...parsed_quiz, hash }
    }
    catch (error)
    {
        console.log(`ERROR: eroare la citire fisier: ${error}`)
    }
}


/**
 * checks if a quiz is empty.
 * @param quiz the quiz to be checked.
 * @returns `true` if it is empty, else `false`.
 */
export function QBQuizIsEmpty(quiz: QBQuiz)
{
    return (
        quiz.title === "" &&
        quiz.description === "" &&
        quiz.contributors === "" &&
        quiz.questions.length === 0
    );
}


/**
 * hash the quiz and extract the metadata.
 * @param quiz the quiz to be processed.
 * @returns the quiz with the hash and the metadata.
 */
export function hashAndGetMetadata(quiz: Quiz): { quiz: Quiz; metadata: QuizMetadata }
{
    const hash = objectHash({ ...quiz, hash: "" });
    const completeQuiz: Quiz = { ...quiz, hash };

    return {
        quiz: completeQuiz,
        metadata: getQuizMetadata(completeQuiz)
    };
}