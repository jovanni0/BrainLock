let timerState = localStorage.getItem("timerState") === "1"; // js converts bools to 1 or 0
let learningMode = localStorage.getItem("learningMode") === "1";



window.onload = () => {
    changeColor('timer', timerState);
    changeColor('learn', learningMode);
};


function goHome() {
    localStorage.setItem("timer_timespan", document.getElementById("timer_value").value);
    window.location.href = "../home/home.html";
    console.log(timer_value_field.value);
}


/**
 * changes the color of a togglable element
 * @param {string} elementId
 * @param {string} isActive 
 */
function changeColor(elementId, isActive)
{
    const element = document.getElementById(elementId);

    element.style.backgroundColor = isActive ? 'lightgreen' : '#FF4f4B';
    element.style.borderColor = isActive ? 'lightgreen' : '#FF4f4B';
    element.style.color = 'black';
}


/**
 * toggel the timer
 */
function toggleTimer()
{
    timerState ^= true;

    changeColor('timer', timerState);
    localStorage.setItem('timerState', timerState);
}


/**
 * toggle the learning mode
 */
function toggleLearningMode()
{
    learningMode ^= true;

    changeColor('learn', learningMode);
    localStorage.setItem('learningMode', learningMode);
}