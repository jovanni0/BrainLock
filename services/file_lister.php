<?php
// Path to the directory (assets/quizzes in this case)
$dir = '../assets/quizzes';

// Check if the directory exists
if (is_dir($dir)) {
    // Scan the directory for files and folders
    $files = scandir($dir);

    // Filter the files to include only .json files
    $jsonFiles = array_filter($files, function($file) {
        return pathinfo($file, PATHINFO_EXTENSION) === 'json';
    });

    // Return the list of .json files as a JSON response
    header('Content-Type: application/json');
    echo json_encode(array_values($jsonFiles)); // array_values to reset the array keys
} else {
    // If the directory does not exist, send an error message
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Directory not found']);
}
?>
