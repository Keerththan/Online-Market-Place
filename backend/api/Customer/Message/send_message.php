<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit; // Respond with a success status for OPTIONS
}

require_once '../../Connection/connection.php';

$highest_id_query = $conn->prepare("SELECT contactID FROM `contact` ORDER BY contactID DESC LIMIT 1");
$highest_id_query->execute();
$highest_id_row = $highest_id_query->fetch(PDO::FETCH_ASSOC);


if ($highest_id_row) {
    $highest_id = $highest_id_row['contactID'];
    $numeric_part = (int) substr($highest_id, 1); // Get the numeric part of the highest ID
    $new_id = 'M' . str_pad($numeric_part + 1, 3, '0', STR_PAD_LEFT); // Increment and pad with zeros
} else {
    $new_id = 'M001';
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve data from POST request
    $companyOwnerID = $_POST['companyOwnerID'];
    $customerID = $_POST['customerID'];
    $email = $_POST['email'];
    $companyName = $_POST['companyName'];
    $customerName = $_POST['customerName'];
    $message = $_POST['message'];
    $message_file = $_FILES['file'] ?? null; 
    $type = "customer";

    
    $contactID = $new_id;
    // Function to create directory if not exists
    function ensureDirectoryExists($directory)
    {
        if (!file_exists($directory)) {
            mkdir($directory, 0777, true); // Creates directory recursively
        }
    }

    function deleteFilesInDirectory($dir)
    {
        if (is_dir($dir)) {
            $files = scandir($dir);
            foreach ($files as $file) {
                if ($file != '.' && $file != '..') {
                    unlink($dir . '/' . $file);
                }
            }
        }
    }
    // Save new image   // Save new image
    $file = $message_file['name'];
    $fileDir = '../../../../frontend/public/files/message/' . $contactID;
    $filePath_move = $fileDir . '/' . $file;
    $filePath = '../../../../public/files/message/' . $contactID . '/' . $file;

    if (file_exists($fileDir)) {
        deleteFilesInDirectory($fileDir);
        rmdir($fileDir);
    }
    if (!file_exists(dirname($filePath_move))) {
        mkdir(dirname($filePath_move), 0777, true);
    }
    move_uploaded_file($message_file['tmp_name'], $filePath_move);

    try {
        // Prepare SQL insert query
        $pstmt = $conn->prepare("INSERT INTO contact (contactID, companyOwnerID, customerID, email, companyName, customerName, message, dataFile,sender) 
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

        $pstmt->execute([$contactID, $companyOwnerID, $customerID, $email, $companyName, $customerName, $message, $filePath, $type]);

        // Check if the message was sent successfully
        if ($pstmt->rowCount() > 0) {
            echo json_encode(['success' => true, 'message' => 'Message sent successfully']);
        } else {
            echo json_encode(['success' => false, 'error' => 'Failed to send message']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
}


?>