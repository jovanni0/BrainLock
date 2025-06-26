<?php

header('Access-Control-Allow-Origin: http://localhost:5173');

// Define base directory (absolute path is safer)
$baseDir = realpath(__DIR__ . '/sources');
$requestedSubDir = $_GET['dir'] ?? '';
$targetDir = realpath($baseDir . '/' . $requestedSubDir);

// Security check: ensure the resolved path is within the base directory
if ($targetDir === false || strpos($targetDir, $baseDir) !== 0 || !is_dir($targetDir)) 
{
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Invalid directory']);
    exit;
}

// Get files
$files = scandir($targetDir);

$validFiles = array_filter($files, function($file) use ($targetDir)
{
    $extension = pathinfo($file, PATHINFO_EXTENSION);
    return in_array(strtolower($extension), ['xml']) && is_file($targetDir . DIRECTORY_SEPARATOR . $file);
});

header('Content-Type: application/json');
echo json_encode(array_values($validFiles));

?>
