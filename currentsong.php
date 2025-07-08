<?php
header('Content-Type: application/json');

// Use your actual song info URL
$url = 'http://c.surilive.com:8270/currentsong?sid=1';

$raw = @file_get_contents($url);
$trimmed = trim($raw);

if (!$trimmed || strtolower($trimmed) === "error" || strtolower($trimmed) === "no stream found") {
    echo json_encode([
        "success" => false,
        "artist" => "",
        "title" => "",
        "raw" => $trimmed,
        "error" => "No Title."
    ]);
    exit;
}

$artist = "Ramasha Media";
$title = $trimmed;
if (strpos($trimmed, " - ") !== false) {
    list($artist, $title) = explode(" - ", $trimmed, 2);
}

echo json_encode([
    "success" => true,
    "artist" => $artist,
    "title" => $title,
    "raw" => $trimmed
]);