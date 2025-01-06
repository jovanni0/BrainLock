<?php

$dir = '../assets/' . ($_GET['dir'] ?? '');

if (is_dir($dir)) {
    $files = scandir($dir);

    $validFiles = array_filter($files, function($file) use ($dir) {
        $extension = pathinfo($file, PATHINFO_EXTENSION);
        return in_array($extension, ['json', 'yaml', 'yml']) && is_file($dir . DIRECTORY_SEPARATOR . $file);
    });

    header('Content-Type: application/json');
    echo json_encode(array_values($validFiles));
} else {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Directory not found']);
}
?>