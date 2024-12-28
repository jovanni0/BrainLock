let questions = JSON.parse(localStorage.getItem("questions"));


$(document).ready(function () {
    $("#loading").show();

    localStorage.removeItem("questions");
    localStorage.removeItem("userAnswersIndexes");

    const question_set_path = localStorage.getItem("question_set_path");

    getQuestions('../../assets/quizzes/' + question_set_path, 2, gotQuestions);
});


function gotQuestions(questions) {
    if (questions == null) {
        console.log("questions array is null");
    }

    localStorage.setItem("questions", JSON.stringify(questions));
    $("#loading").hide();
    navigateToNextPage();
}


function navigateToNextPage() {
    window.location.href = "quiz.html";
}