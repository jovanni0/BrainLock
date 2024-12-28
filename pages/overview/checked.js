let user_answers_indexes = JSON.parse(localStorage.getItem('userAnswersIndexes')) || [];
let questions = JSON.parse(localStorage.getItem("questions"));


/**
 * on document load
 */
$(document).ready(function () {
    displayQuestions();

    $("#new_quiz").on("click", function () {
        window.location.href = "../quiz/quizmaster.html";
    });
});


/**
 * display the questions and answers
 */
function displayQuestions() {
    let nr_correct_answers = 0;
    let nr_incorrect_answers = 0;
    let nr_questions_not_answered = 0;

    questions.forEach((question, questionIndex) => {
        let answered = false;
        let all_correct = true;
        let partially_answered = false;
        let wrong = false;

        const questionContainer = $('<div class="answer_container"></div>').html(`${questionIndex + 1}.${question.text}`);

        question.answers.forEach((answer, answerIndex) => {
            let answerElement = $('<div class="answers"></div>').text(answer);

            if (user_answers_indexes[questionIndex] && user_answers_indexes[questionIndex].includes(answerIndex)) {
                answered = true;

                if (question.correctAnswers.includes(answerIndex)) {
                    answerElement.addClass('correct-answer');
                    answerElement.append(' <i class="fas fa-check" style="color: green;"></i>');
                }
                else {
                    answerElement.addClass('incorrect-answer');
                    answerElement.append(' <i class="fas fa-times" style="color: red;"></i>');
                    all_correct = false;
                    wrong = true;
                }
            }
            else {
                if (question.correctAnswers.includes(answerIndex)) {
                    answerElement.addClass('missed-correct-answer');
                    answerElement.append(' <i class="fas fa-check" style="color: darkblue;"></i>');
                    all_correct = false;
                    partially_answered = true;
                }
            }

            questionContainer.append(answerElement);
        });

        $("#text").append(questionContainer);

        if (!answered) {
            nr_questions_not_answered++;
        }
        else if (all_correct) {
            nr_correct_answers++;
        }
        else if (wrong || partially_answered) {
            nr_incorrect_answers++;
        }
    });

    injectQuizzStats(nr_correct_answers, nr_incorrect_answers, nr_questions_not_answered);
}


/**
 * injects the stats of the quizz
 * @param {*} nr_correct_answers 
 * @param {*} nr_incorrect_answers 
 * @param {*} nr_answers_not_answerd 
 */
function injectQuizzStats(nr_correct_answers, nr_incorrect_answers, nr_questions_not_answered) {
    const score_element = $('<div class="score"></div>');
    score_element.html(
        '<span style="color: #d4f7d4;">Nr întrebări corecte: ' + nr_correct_answers + '</span><br>' +
        '<span style="color: #f7d4d4;">Nr de întrebări greșite: ' + nr_incorrect_answers + '</span><br>' +
        '<span style="color: #8ad2ff;">Nr de întrebări fără răspuns: ' + nr_questions_not_answered + '</span>'
    );
    $('#score').append(score_element);
    
    console.log("Numărul de întrebări corecte:", nr_correct_answers);
    console.log("Numărul de întrebări greșite:", nr_incorrect_answers);
    console.log("Numărul de întrebări fără răspuns:", nr_questions_not_answered);
}