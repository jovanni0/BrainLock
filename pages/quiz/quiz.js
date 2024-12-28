let questions = JSON.parse(localStorage.getItem("questions"));
let questionIndex = parseInt(localStorage.getItem("questionIndex") || "0")
let userAnswersIndexes = JSON.parse(localStorage.getItem("userAnswersIndexes")) || []


$(document).ready(function () {
    displayQuestion();

    const timer_status = localStorage.getItem("timerState") || "0";
    if (timer_status === "1") {
        activateTimer();
    }

    $("#prev_question").on("click", function () {
        questionIndex--;
        displayQuestion();
    });
});


function displayQuestion() {
    if (questionIndex >= questions.length) {
        console.log("question out of bounds");
        return;
    }

    let currentQuestion = questions[questionIndex];
    $("#question_text").html(`${questionIndex + 1}. ${currentQuestion.text}`);
    $("#answers").html("");
    

    currentQuestion.answers.forEach((answer, i) => {
        const isSelected = userAnswersIndexes[questionIndex] && userAnswersIndexes[questionIndex].includes(i) ? "checked" : "";
        $("#answers").append(
            `<div class="answer"><input type="checkbox" data-index="${i}" ${isSelected}> ${answer}</div>`
        );
    });


    $('#answers input[type="checkbox"]').on("change", function () {
        const answerIndex = $(this).data("index");
        userAnswersIndexes[questionIndex] = userAnswersIndexes[questionIndex] || [];

        if (this.checked) {
            if (!userAnswersIndexes[questionIndex].includes(answerIndex)) {
                userAnswersIndexes[questionIndex].push(answerIndex);
            }
        } else {
            userAnswersIndexes[questionIndex] = userAnswersIndexes[questionIndex].filter(idx => idx !== answerIndex);
        }

        userAnswersIndexes = userAnswersIndexes.map(arr => arr.sort((a, b) => a - b));
        localStorage.setItem('userAnswersIndexes', JSON.stringify(userAnswersIndexes));
    });


    if (questionIndex + 1 >= questions.length) {
        $("#next_question").text("SEND");
        $("#next_question").off("click").on("click", function () {
            window.location.href = "../overview/checked.html";
        });
    } else {
        $("#next_question").text("NEXT");
        $("#next_question").off("click").on("click", function () {
            questionIndex++;
            displayQuestion();
        });
    }

    if (questionIndex == 0) {
        $("#prev_question").hide();
    } else {
        $("#prev_question").show();
    }
}


/**
 * activate the timer on the page
 */
function activateTimer() {
    console.log("activate timer");

    document.getElementById("demo").innerHTML = "loading...";

    var timespan = parseInt(localStorage.getItem("timer_timespan")) * 60000 || 900000; // default 15 min
    var countdown = setInterval(
        function () {
            var minutes = Math.floor((timespan % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((timespan % (1000 * 60)) / 1000);

            document.getElementById("demo").innerHTML = minutes + " m " + seconds + " s ";

            if (timespan < 0) {
                clearInterval(countdown);
                document.getElementById("demo").innerHTML = "EXPIRED";
                setTimeout(() => { window.location.href = "../overview/checked.html"; }, 2000);
            }
            timespan -= 1000;
        }, 
        1000
    );
}