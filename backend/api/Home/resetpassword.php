<?php
session_start();
// header('Access-Control-Allow-Origin: http://localhost:5173'); // Replace with your frontend URL
// header('Access-Control-Allow-Credentials: true'); // Allow cookies to be sent
// header('Access-Control-Allow-Headers: Content-Type, Authorization');
// header('Access-Control-Allow-Methods: POST, OPTIONS');
include '../config/cors.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    include('../Connection/connection.php');
    include('./User.php'); 
    
    $data = json_decode(file_get_contents('php://input'), true);
    $confirmPassword = $data['confirmPassword'];
    $newPassword = $data['newPassword'];
    $email = $data['email'];
    $userType= $data['userType'];

      
    // Validate the input
    if (empty($confirmPassword) || empty($newPassword)) {
        $response['message'] = 'Confirm password and new password are required';
        echo json_encode($response);
        exit;
    }

    switch ($userType) {
        case 'admin':
            $sql = "UPDATE admins SET password = ? WHERE email = ?";
            break;
        case 'company':
            $sql = "UPDATE companyowners SET password = ? WHERE email = ?";
            break;
        case 'customer':
            $sql = "UPDATE customers SET password = ? WHERE email = ?";
            break;
        default:
            $response['message'] = "Invalid user type $userType";
            echo json_encode($response);
            exit;
    }
    $newhashedPassword =password_hash($newPassword, PASSWORD_DEFAULT);
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(1, $newhashedPassword);
    $stmt->bindParam(2, $email);

    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = 'Password updated successfully';
        $response['userType'] = $userType; // To redirect user back to their dashboard
    } else {
        $response['message'] = 'Failed to update password. Please try again.';
    }
} else {
    $response['message'] = 'Invalid request method';
}

echo json_encode($response);
$conn = null;
?>
