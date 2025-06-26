const parser = new DOMParser();
const converter = new showdown.Converter({ simpleLineBreaks: true, ghCodeBlocks: true });

// For browsers (using the CDN), markdownit and markdownitKatex are globally available
// let md = window.markdownit().use(window.markdownitKatex);
// const md = new MarkdownIt().use(markdownItKatex);

// Inside your function that converts Markdown text to HTML:
function markdownToHTML(markdownText) {
  // decode entities if you want, etc.
//   return md.render(markdownText);
  return converter.makeHtml(markdownText)
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


/**
 * Shuffles the answers of each quiz and remaps correct answer indices.
 * @param {Array} quizzes - Array of quiz objects with `answers` and `correctAnswers`.
 * @returns {Array} A new array of quiz objects with shuffled answers and remapped correct answer indices.
 */
function shuffleAnswers(quizzes) {
    return quizzes.map(quiz => {
        const originalAnswers = quiz.answers;
        const originalCorrectIndices = quiz.correctAnswers;

        // Map answers to objects that track original indices
        const indexedAnswers = originalAnswers.map((answer, index) => ({ answer, originalIndex: index }));

        // Shuffle indexed answers
        const shuffled = shuffle(indexedAnswers);

        // Reconstruct answers and remap correct indices
        const newAnswers = shuffled.map(item => item.answer);
        const indexMap = new Map(shuffled.map((item, newIndex) => [item.originalIndex, newIndex]));

        const newCorrectIndices = originalCorrectIndices.map(oldIndex => indexMap.get(oldIndex));

        return {
            ...quiz,
            answers: newAnswers,
            correctAnswers: newCorrectIndices
        };
    });
}


/**
 * Dedents Markdown content to remove unnecessary leading spaces
 * up to the triple backticks.
 * @param {string} markdownText The Markdown content
 * @returns {string} The dedented Markdown content
 */
function dedentMarkdown(markdownText) {
    const lines = markdownText.split("\n");

    // Find the first line with triple backticks
    let minIndent = Infinity;
    for (let line of lines) {
        if (line.trim().startsWith("```")) {
            break;
        }
        if (line.trim() !== "") {
            const leadingSpaces = line.match(/^(\s*)/)[1].length;
            minIndent = Math.min(minIndent, leadingSpaces);
        }
    }

    // Remove the minimum indent from all lines
    if (minIndent < Infinity) {
        return lines.map(line => line.slice(minIndent)).join("\n");
    }

    return markdownText; // Return unmodified if no triple backticks are found
}

/**
 * Parses a single XML document and extracts quiz data.
 */
function parseXMLContent(xmlText) {
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");
    const quizzes = xmlDoc.getElementsByTagName("quizz");
    return Array.from(quizzes).map(quizz => extractQuizData(quizz));
}

/**
 * Extracts quiz data from a <quizz> element.
 */
function extractQuizData(quizz) {
    const questionElement = quizz.getElementsByTagName("question")[0];
    console.log(questionElement);

    // Combine text and SVG content
    const content = Array.from(questionElement.childNodes).map(node => {
        if (node.nodeType === Node.TEXT_NODE) {
            // Dedent Markdown text before converting to HTML
            const dedentedText = dedentMarkdown(node.textContent.trim());
            console.log(dedentedText);
            const escapedText = decodeEntityes(dedentedText)
            console.log(escapedText);
            // const convertedText = converter.makeHtml(escapedText);
            const convertedText = markdownToHTML(escapedText);
            console.log(convertedText);
            return convertedText;
        } else if (node.nodeName.toLowerCase() === "svg" || node.nodeName.toLowerCase() === "img") {
            return node.outerHTML;
        }
        return "";
    }).join("");

    // Extract answers and correct answers
    const answers = Array.from(quizz.getElementsByTagName("answer")).map(
        // answer => converter.makeHtml(answer.textContent.trim())
        answer => markdownToHTML(answer.textContent.trim())
    );
    const correctAnswers = Array.from(quizz.getElementsByTagName("correctAnswerIndex")).map(
        correctAnswer => parseInt(correctAnswer.textContent.trim(), 10)
    );

    // Extract explanation if it exists
    const explanationNode = quizz.getElementsByTagName("explanation")[0];
    const explanation = Array.from(explanationNode.childNodes).map(node => {
        if (node.nodeType === Node.TEXT_NODE) {
            // Dedent Markdown text before converting to HTML
            const dedentedText = dedentMarkdown(node.textContent.trim());
            console.log(dedentedText);
            const escapedText = decodeEntityes(dedentedText)
            console.log(escapedText);
            // const convertedText = converter.makeHtml(escapedText);
            const convertedText = markdownToHTML(escapedText);
            console.log(convertedText);
            return convertedText;
        } 
        else if (node.nodeName.toLowerCase() === "svg" || node.nodeName.toLowerCase() === "img") {
            return node.outerHTML;
        }
        return "";
    }).join("");
    // // const explanation = explanationNode ? converter.makeHtml(decodeEntityes(dedentMarkdown(explanationNode.textContent.trim()))) : null;
    // const explanation = explanationNode ? markdownToHTML(decodeEntityes(dedentMarkdown(explanationNode.textContent.trim()))) : null;

    return { text: content, answers, correctAnswers, explanation };
}

/**
 * Fetches and parses all included XML files.
 */
function fetchAndParseIncludes(xmlDoc) {
    const includeElements = Array.from(xmlDoc.getElementsByTagName("include-element"));
    const promises = includeElements.map(include =>
        fetch('../assets/quizzes/' + include.textContent.trim())
            .then(response => response.text())
            .then(parseXMLContent)
            .catch(error => console.error("Error fetching main file:", error))
    );

    return Promise.all(promises).then(results => results.flat());
}

/**
 * Combines the main data with included data and applies shuffling and filtering.
 */
function processQuestions(mainData, includedData, number_of_quizzes, toShuffle) {
    const combinedData = [...mainData, ...includedData];
    // let questionsOrder = shuffle(combinedData);
    let questionsOrder = combinedData;
    if (toShuffle) {
        questionsOrder = shuffle(questionsOrder);
        questionsOrder = shuffleAnswers(questionsOrder)
    }

    if (number_of_quizzes !== "all") {
        questionsOrder = questionsOrder.slice(0, number_of_quizzes);
    }

    return questionsOrder;
}

/**
 * Main function to fetch and process the main XML file and included files.
 */
function getQuestionsFromXML(path, number_of_quizzes, shuffle, callback) {
    fetch(path)
        .then(response => response.text())
        .then(text => reversePrettyPrintXML(text))
        .then((text) => {
            const mainData = parseXMLContent(text);
            // console.log(mainData);
            const xmlDoc = parser.parseFromString(text, "application/xml");

            fetchAndParseIncludes(xmlDoc)
                .then(includedData => {
                    const questionsOrder = processQuestions(mainData, includedData, number_of_quizzes, shuffle);
                    callback(questionsOrder);
                })
                .catch(error => console.error("Error fetching included files:", error));
        })
        .catch(error => console.error("Error fetching main file:", error));
}


/**
 * Decode escaped HTML entities (&lt;, &gt;, etc.) inside Markdown code blocks.
 * @param {string} markdownText The raw Markdown text.
 * @returns {string} Processed Markdown with decoded entities in code blocks.
 */
function decodeEntityes(text) {
    const xmlEntities = {
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&quot;': '"',
    '&apos;': "'",
    };

    // Replace all XML entities with their corresponding characters
    return text.replace(/&lt;|&gt;|&amp;|&quot;|&apos;/g, match => xmlEntities[match]);
}

function encodeEntityes(text) {
    const xmlEntities = {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        "'": '&apos;',
    };

    // Replace characters with their corresponding HTML entities
    return text.replace(/[<>&"'"]/g, match => xmlEntities[match]);
}
    


/**
 * Reverse-pretty-printer: Removes base indentation from XML but preserves extra Markdown indentation.
 * @param {string} xmlText The indented XML as a string
 * @returns {string} The un-indented XML with Markdown preserved
 */
function reversePrettyPrintXML(xmlText) {
    const lines = xmlText.split("\n");
    let storedIndent = 0; // Tracks the indentation level of XML tags

    const processedLines = lines.map(line => {
        const trimmedLine = line.trim();

        if (trimmedLine.startsWith("<") && trimmedLine.endsWith("/>")) {
            return line.slice(storedIndent);
        }
        if (trimmedLine.startsWith("<") && trimmedLine.endsWith(">")) {
            // Line contains an XML tag; remove all indentation and store its level
            storedIndent = line.match(/^\s*/)[0].length + 4; // Store leading spaces
            return trimmedLine; // Return the line with all indentation removed
        } else if (trimmedLine) {
            // Line is content (not an XML tag); remove storedIndent level
            return line.slice(storedIndent);
        }

        return line; // Return blank lines as-is
    });

    // console.log(processedLines.join("\n"));

    return processedLines.join("\n");
}