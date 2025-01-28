<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include '../../Connection/connection.php'; // Adjust the path to your connection file  

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['customerID'])) {
        echo json_encode(['error' => 'customerID is missing']);
        exit;
    }

    $customerID = $data['customerID'];
    $type = "company";

    try {

        // Count unread messages
        $pstmt = $conn->prepare("SELECT COUNT(*) as unreadCount FROM contact WHERE customerID = ? AND sender = ? AND isRead = 0");
        $pstmt->bindParam(1, $customerID);
        $pstmt->bindParam(2, $type);
        $pstmt->execute();

        $result = $pstmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode(['unreadCount' => $result['unreadCount']]);

    } catch (PDOException $e) {
        error_log($e->getMessage());
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    } 
}
