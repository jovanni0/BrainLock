import type { Question } from "../types/quiz-types";
import type { QuestionCategory } from "../components/QuestionOverviewCard";


/**
 * sorts the question based on the correctness of the selected answers.
 * @param question the question to be sorted.
 * @returns the question category.
 */
export function getQuestionStatus(question: Question): QuestionCategory
{
    if (question.answers.every(a => !a.selected)) return "skipped";

    if (question.answers.every(a => a.correct === a.selected)) return "correct";

    return "wrong";
};