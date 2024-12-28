fetch('../../services/file_lister.php?dir=quizzes')
    .then(response => response.json())
    .then(files => {
        console.log(files);

        const dropdown = document.getElementById('quizz_selector');
        files.forEach(file => {
            const option = document.createElement('option');
            option.value = file;
            option.textContent = file;
            dropdown.appendChild(option);
        });
    })
    .catch(err => console.error('Error fetching files:', err));


fetch('../../services/file_lister.php?dir=flashcards')
    .then(response => response.json())
    .then(files => {
        console.log(files);

        const dropdown = document.getElementById('flashcard_selector');
        files.forEach(file => {
            const option = document.createElement('option');
            option.value = file;
            option.textContent = file;
            dropdown.appendChild(option);
        });
    })
    .catch(err => console.error('Error fetching files:', err));


$(document).ready(function () {
    const quizTimerIsOn = localStorage.getItem("quiz_timer_is_on") || "false";
    const quizTimeSpan = parseInt(localStorage.getItem("quiz_time_span")) || 15;
    const quizShowAll = localStorage.getItem("quiz_show_all") || "false";
    const quizNumber = parseInt(localStorage.getItem("quiz_number")) || 20;
    document.getElementById('quizzTimerInput').value = quizTimeSpan;
    document.getElementById('quizzTimerInput').disabled = quizTimerIsOn === "false";
    document.getElementById('quizzTimerCheckbox').checked = quizTimerIsOn === "true";
    document.getElementById('quizzNumberInput').value = quizNumber;
    document.getElementById('quizzNumberInput').disabled = quizShowAll === "true";
    document.getElementById('quizzShowAllCheckbox').checked = quizShowAll === "true";

    const flashcardTimerIsOn = localStorage.getItem("flashcard_timer_is_on") || "false";
    const flashcardTimeSpan = parseInt(localStorage.getItem("flashcard_time_span")) || 15;
    const flashcardShowAll = localStorage.getItem("flashcard_show_all") || "false";
    const flashcardNumber = parseInt(localStorage.getItem("quiz_number")) || 20;
    document.getElementById('flashcardTimerInput').value = flashcardTimeSpan;
    document.getElementById('flashcardTimerInput').disabled = flashcardTimerIsOn === "false";
    document.getElementById('flashcardTimerCheckbox').checked = flashcardTimerIsOn === "true";
    document.getElementById('flashcardNumberInput').value = flashcardNumber;
    document.getElementById('flashcardNumberInput').disabled = flashcardShowAll === "true";
    document.getElementById('flashcardShowAllCheckbox').checked = flashcardShowAll === "true";
});


function startQuizz() {
    const dropdown = document.getElementById("quizz_selector");
    localStorage.setItem("question_set_path", dropdown.value);

    const timerCheckbox = document.getElementById('quizzTimerCheckbox');
    const timerInput = document.getElementById('quizzTimerInput');
    const showAllCheckbox = document.getElementById('quizzShowAllCheckbox');
    const numberInput = document.getElementById('quizzNumberInput');
    localStorage.setItem("quiz_timer_is_on", timerCheckbox.checked);
    localStorage.setItem("quiz_time_span", timerInput.value);
    localStorage.setItem("quiz_show_all", showAllCheckbox.checked);
    localStorage.setItem("quiz_number", numberInput.value);

    window.location.href = "../quiz/quizmaster.html";
}


function startFlashcard() {
    const dropdown = document.getElementById("flashcard_selector");
    localStorage.setItem("flashcard_question_set_path", dropdown.value);

    const timerCheckbox = document.getElementById('flashcardTimerCheckbox');
    const timerInput = document.getElementById('flashcardTimerInput');
    const showAllCheckbox = document.getElementById('flashcardShowAllCheckbox');
    const numberInput = document.getElementById('flashcardNumberInput');
    localStorage.setItem("flashcard_timer_is_on", timerCheckbox.checked);
    localStorage.setItem("flashcard_time_span", timerInput.value);
    localStorage.setItem("flashcard_show_all", showAllCheckbox.checked);
    localStorage.setItem("flashcard_number", numberInput.value);

    window.location.href = "../flashcard/flashmaster.html";
}


function switchPage(pageId, buttonId) {
    const contents = document.querySelectorAll('.page');
    contents.forEach(content => content.classList.remove('active'));

    // Deactivate all buttons
    const buttons = document.querySelectorAll('.tab');
    buttons.forEach(button => button.classList.remove('tab_active'));

    // Show the selected content and mark button as active
    document.getElementById(pageId).classList.add('active');
    document.getElementById(buttonId).classList.add('tab_active');
}


function toggleQuizzTimer() {
    const checkbox = document.getElementById('quizzTimerCheckbox');
    const input = document.getElementById('quizzTimerInput');
    input.disabled = !checkbox.checked;
    localStorage.setItem("quiz_timer_is_on", checkbox.checked)
}


function toggleQuizzShowAll() {
    const checkbox = document.getElementById('quizzShowAllCheckbox');
    const input = document.getElementById('quizzNumberInput');
    input.disabled = checkbox.checked;
    localStorage.setItem("quiz_show_all", checkbox.checked)
}


function toggleFlashcardTimer() {
    const checkbox = document.getElementById('flashcardTimerCheckbox');
    const input = document.getElementById('flashcardTimerInput');
    input.disabled = !checkbox.checked;
    localStorage.setItem("flashcard_timer_is_on", checkbox.checked)

}


function toggleFlashcardShowAll() {
    const checkbox = document.getElementById('flashcardShowAllCheckbox');
    const input = document.getElementById('flashcardNumberInput');
    input.disabled = checkbox.checked;
    localStorage.setItem("flashcard_show_all", checkbox.checked)
}