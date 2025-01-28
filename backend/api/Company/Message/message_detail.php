<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Adjust the path to your connection file
include '../../Connection/connection.php'; // Adjust the path to your connection file


if (isset($_GET['contact_id'])) {
    $contactID = $_GET['contact_id'];

    try {
        $pstmt = $conn->prepare("SELECT * FROM contact WHERE contactID = ?");
        $pstmt->bindParam(1,$contactID);
        $pstmt->execute();
        $message = $pstmt->fetch(PDO::FETCH_ASSOC);

        if ($message) {
            echo json_encode($message);
        } else {
            echo json_encode(['error' => 'No message found with this ID.']);
        }
    } catch (Exception $e) {
        echo json_encode(['error' => 'Error fetching message: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Contact ID is required.']);
}
?>
