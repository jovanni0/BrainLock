$(document).ready(function () {
    $("#loading").show();

    localStorage.removeItem("flashcards_data");
    localStorage.removeItem("flashcards_question_index");

    const flashcard_question_set_path = localStorage.getItem("flashcard_question_set_path");
    const flashcardTimerIsOn = localStorage.getItem("flashcard_timer_is_on") || "false";
    const flashcardTimeSpan = parseInt(localStorage.getItem("flashcard_time_span")) || 15;
    const flashcardShowAll = localStorage.getItem("flashcard_show_all") || "false";
    const flashcardNumber = parseInt(localStorage.getItem("flashcard_number")) || 20;

    if (flashcardShowAll === "true")
        getQuestions('../../assets/flashcards/' + flashcard_question_set_path, "all", gotQuestions);
    else
        getQuestions('../../assets/flashcards/' + flashcard_question_set_path, flashcardNumber, gotQuestions);
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