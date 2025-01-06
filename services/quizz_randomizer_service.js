function getQuestions(path, number_of_quizzes, callback) {
    if (path.endsWith(".yaml")) {
        fetch(path)
        .then(response => response.text())
        .then(text => {
            const data = jsyaml.load(text);
            let questionsOrder = shuffle(data);

            if (!(number_of_quizzes === "all")) {
                questionsOrder = questionsOrder.slice(0, number_of_quizzes);
            }
            callback(questionsOrder); // send the questions back
            return;
        })
        .catch(error => console.error('Error fetching questions:', error));
    }
    
    if (path.endsWith(".json")) {
        fetch(path)
        .then(response => response.json())
        .then(data => {
            questionsOrder = shuffle(data);

            if (!(number_of_quizzes === "all")) {
                questionsOrder = questionsOrder.slice(0, number_of_quizzes);
            }
            callback(questionsOrder); // sent the questions back
            return;
        })
        .catch(error => console.error('Error fetching questions:', error));
    }
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
