<?php

$dir = '../assets/' . ($_GET['dir'] ?? '');

if (is_dir($dir)) {
    $files = scandir($dir);

    $jsonFiles = array_filter($files, function($file) use ($dir) {
        return pathinfo($file, PATHINFO_EXTENSION) === 'json' && is_file($dir . DIRECTORY_SEPARATOR . $file);
    });

    // Return the list of .json files as a JSON response
    header('Content-Type: application/json');
    echo json_encode(array_values($jsonFiles));
} else {
    // If the directory does not exist, send an error message
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Directory not found']);
}
?>