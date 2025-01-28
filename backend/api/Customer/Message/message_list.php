<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

 // Adjust the path to your connection file
include '../../Connection/connection.php'; 



if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['customerID'])) {
        echo json_encode(['error' => 'customerID is missing']);
        exit;
    }

    $customerID = $data['customerID'];
    $type = "company";

    try {
        

        $pstmt = $conn->prepare("SELECT * FROM contact WHERE customerID = ? AND sender = ? ORDER BY date DESC");
        $pstmt->bindValue(1, $customerID);
        $pstmt->bindValue(2, $type);
        $pstmt->execute();

        $messages = $pstmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($messages);

    } catch (PDOException $e) {
        error_log($e->getMessage());
       
    } 
}
