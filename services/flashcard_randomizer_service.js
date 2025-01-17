function getQuestions(path, number_of_quizzes, randomize, callback) {
    const converter = new showdown.Converter({ simpleLineBreaks: true });

    if (path.endsWith(".yaml")) {
        fetch(path)
        .then(response => response.text())
        .then(text => {
            let data = jsyaml.load(text);

            data = data.map(elem => ({
                ...elem,
                question: converter.makeHtml(elem.question),
                answer: converter.makeHtml(elem.answer)
            }));

            if (randomize === true) data = shuffle(data);

            if (!(number_of_quizzes === "all")) {
                data = data.slice(0, number_of_quizzes);
            }
            callback(data); // send the questions back
            return;
        })
        .catch(error => console.error('Error fetching questions:', error));
    }
    
    if (path.endsWith(".json")) {
        fetch(path)
        .then(response => response.json())
        .then(data => {
            data = data.map(elem => ({
                ...elem,
                question: converter.makeHtml(elem.question),
                answer: converter.makeHtml(elem.answer)
            }));

            if (randomize === true) data = shuffle(data);

            if (!(number_of_quizzes === "all")) {
                data = data.slice(0, number_of_quizzes);
            }
            
            callback(data); // sent the questions back
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