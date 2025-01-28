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
        // Check if $conn is available
        if (!$conn) {
            throw new Exception('Database connection failed');
        }

        // Update the message's isRead status to 1 (read) for the specific contactID
        $pstmt = $conn->prepare("UPDATE contact SET isRead = 1 WHERE contactID = ?");
        $pstmt->bindParam(1, $contactID, PDO::PARAM_INT);
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
