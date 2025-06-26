<?php

header('Access-Control-Allow-Origin: http://localhost:5173');

$baseDir = __DIR__ . '/sources/'; // adjust path to your folder

// Get the filename from query param, sanitize it to prevent path traversal
$filename = basename($_GET['file'] ?? '');

$filePath = $baseDir . $filename;

if (!$filename || !file_exists($filePath) || !is_file($filePath)) {
    http_response_code(404);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'File not found']);
    exit;
}

// Set content type based on extension (simple version)
$ext = pathinfo($filePath, PATHINFO_EXTENSION);
$contentTypes = [
    'json' => 'application/json',
    'xml'  => 'application/xml',
    'yaml' => 'application/x-yaml',
    'yml'  => 'application/x-yaml',
];

$contentType = $contentTypes[$ext] ?? 'application/octet-stream';
header('Content-Type: ' . $contentType);

// Read and output file contents
readfile($filePath);

?>