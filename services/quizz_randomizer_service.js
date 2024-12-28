function getQuestions(path, number_of_quizzes, callback) {
    
    fetch(path)
        .then(response => response.json())
        .then(data => {
            questionsOrder = shuffle(data);
            questionsOrder = questionsOrder.slice(0, number_of_quizzes);

            callback(questionsOrder); // sent the questions back
        })
        .catch(error => console.error('Error fetching questions:', error));
}


/**
 * Fisher-Yates Shuffle function to shuffle the questions array
 * @param {array} array the array that should be shuffled
 * @returns a new, shuffled array
 */
function shuffle(array) {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}
