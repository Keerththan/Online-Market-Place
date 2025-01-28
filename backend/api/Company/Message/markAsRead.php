<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include '../../Connection/connection.php'; // Adjust the path to your connection file  // Adjust the path to your connection file

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['contactID'])) {
        echo json_encode(['error' => 'contactID is missing']);
        exit;
    }

    $contactID = $data['contactID'];

    try {

        $pstmt = $conn->prepare("UPDATE contact SET isRead = 1 WHERE contactID = ?");
        $pstmt->bindValue(1, $contactID);
        $pstmt->execute();

        // Return success response
        echo json_encode(['success' => 'Message marked as read']);

    } catch (PDOException $e) {
        error_log($e->getMessage());
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    } catch (Exception $e) {
        error_log($e->getMessage());
        echo json_encode(['error' => $e->getMessage()]);
    }
}
