$(document).ready(function () {
    $("#loading").show();

    localStorage.removeItem("flashcards_data");
    localStorage.removeItem("flashcards_question_index");

    // const question_set_path = localStorage.getItem("question_set_path");

    getQuestions('../../assets/flashcards/' + "flashcards.json", 3, gotQuestions);
});


function gotQuestions(questions) {
    if (questions == null) {
        console.log("questions array is null");
    }

    localStorage.setItem("flashcards_data", JSON.stringify(questions));
    $("#loading").hide();
    navigateToNextPage();
}


function navigateToNextPage() {
    window.location.href = "flashcard.html";
}