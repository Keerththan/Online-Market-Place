<?php
session_start();
// header('Access-Control-Allow-Origin: http://localhost:5173'); // Replace with your frontend URL
// header('Access-Control-Allow-Credentials: true'); // Allow cookies to be sent
// header('Access-Control-Allow-Headers: Content-Type, Authorization');
// header('Access-Control-Allow-Methods: POST, OPTIONS');
include '../config/cors.php';
$response = array('success' => false, 'message' => '');



if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    include('../Connection/connection.php');
    include('User.php'); 
    
    $data = json_decode(file_get_contents('php://input'), true);
    $currentPassword = $data['currentPassword'];
    $newPassword = $data['newPassword'];
    $email = $data['email'];
    $userType= $data['userType'];

      
    // Validate the input
    if (empty($currentPassword) || empty($newPassword)) {
        $response['message'] = 'Current password and new password are required';
        echo json_encode($response);
        exit;
    }

    switch($userType) {
        case 'admin':
            $cpsql = "SELECT password FROM admins WHERE email =?";
            break;
        case 'customer':
            $cpsql = "SELECT password FROM customers WHERE email =?";
            break;
        case 'company':
            $cpsql = "SELECT password FROM companyowners WHERE email =?";
            break;
        default:
            $response['message'] = "Invalid user type $userType cheking current password ";
            echo json_encode($response);
            exit;
    }

    $cpstmt = $conn->prepare($cpsql);
    $cpstmt->bindParam(1,$email);
    $cpstmt->execute();
    $user = $cpstmt->fetch(PDO::FETCH_ASSOC);
    $cpwd = $user['password'];
    if (password_verify($currentPassword, $cpwd)) {
        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
    }else{
        $response['message'] = "Current password  $currentPassword is incorrect ";
        echo json_encode($response);
        exit;
    }

    
    
    

    // Update the password and set is_first_login to false in the respective table
    switch ($userType) {
        case 'admin':
            $sql = "UPDATE admins SET password = ?, is_first_login = FALSE WHERE email = ?";
            break;
        case 'company':
            $sql = "UPDATE companyowners SET password = ?, is_first_login = FALSE WHERE email = ?";
            break;
        case 'customer':
            $sql = "UPDATE customers SET password = ?, is_first_login = FALSE WHERE email = ?";
            break;
        default:
            $response['message'] = 'Invalid user type';
            echo json_encode($response);
            exit;
    }

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(1, $hashedPassword);
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
