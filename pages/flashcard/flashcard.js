let questions = JSON.parse(localStorage.getItem("flashcards_data"));
let flashcardQuestionIndex = parseInt(localStorage.getItem("flashcards_question_index") || "0")
let loaded = 0;


$(document).ready(function () {
    react2Event();
});


function react2Event() {
    const card = document.getElementById("card");

    if (questions == null) {
        console.log("question null");
        return;
    }

    if (loaded == 1 && card.classList == "question") {
        card.innerText = questions[flashcardQuestionIndex].answer;
        card.classList = "answer"
        flashcardQuestionIndex++;
        return;
    }

    if (flashcardQuestionIndex >= questions.length) {
        console.log("index runaway");
        window.location.href = "../home/home.html";
        return;
    }

    if (card.classList.length == 0 || card.classList == "answer") {
        card.innerText = questions[flashcardQuestionIndex].question;
        card.classList = "question"
        loaded = 1;
        return;
    }
}