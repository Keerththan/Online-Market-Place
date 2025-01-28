<?php
// Allow from any origin
header('Access-Control-Allow-Origin: *');
// Allow specific HTTP methods
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
// Allow specific headers
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../../Connection/connection.php';

$input = json_decode(file_get_contents('php://input'), true);
$companyName = $input['companyName'];
$companyNumber = $input['companyNumber'];

$connection = (new DbConnector())->getConnection();
$sql = "SELECT * FROM companyowners WHERE email = :companyName AND password = :companyNumber";
$stmt = $connection->prepare($sql);
$stmt->bindParam(':companyName', $companyName);
$stmt->bindParam(':companyNumber', $companyNumber);
$stmt->execute();
$result = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$result) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>
