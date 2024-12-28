// fetch('../../assets/quizzes') // Fetch the current folder
//     .then(response => response.text()) // Get the directory listing as HTML
//     .then(html => {
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(html, 'text/html');
//         const files = Array.from(doc.querySelectorAll('a'))
//             .map(link => link.href)
//             .filter(name => name.endsWith('.json'));

//         console.log(files);

//         const dropdown = document.getElementById('grila');
//         files.forEach(file => {
//             const option = document.createElement('option');
//             option.value = file.split("/").pop();
//             option.textContent = decodeURIComponent(file.split("/").pop());
//             dropdown.appendChild(option);
//         });
//     })
//     .catch(err => console.error('Error fetching files:', err));

fetch('../../services/file_lister.php')  // URL to the PHP script
  .then(response => response.json())  // Parse the JSON response
  .then(files => {
        console.log(files);

        const dropdown = document.getElementById('grila');
        files.forEach(file => {
            const option = document.createElement('option');
            option.value = file;
            option.textContent = file;
            dropdown.appendChild(option);
        });
})
  .catch(err => console.error('Error fetching files:', err));



function saveSelectedQuestionSet() {
    const dropdown = document.getElementById("grila");
    localStorage.setItem("question_set_path", dropdown.value);

    console.log(dropdown.options[dropdown.selectedIndex].text);
    console.log(dropdown.value);

    window.location.href = "../quiz/quizmaster.html";
} 