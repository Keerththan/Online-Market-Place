<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST');

$response = array('success' => false, 'message' => '');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // include('../Connection/connection.php');
    // include('../Connection/DbConnector.php');
    include('User.php');
    $data = json_decode(file_get_contents('php://input'), true);
    $email = $data['email'];
    $password = $data['password'];

    if (empty($email) || empty($password)) {
        $response['message'] = 'Email and Password are required';
        echo json_encode($response);
        exit;
    }

 
    $User = new User(); 

    $user = null;
    $userType = null;
    if ($user = $User->check_user( $email, $password, 'admins')) {
        $userType = 'admin';
    } elseif ($user = $User->check_user($email, $password, 'companyowners')) {
        $userType = 'company';
    } elseif ($user = $User->check_user( $email, $password, 'customers')) {
        $userType = 'customer';
    } else {
        $response['message'] = 'Invalid email or password';
    }
    $userT = $User->getUserType($email);

    if ($userType) {
        $is_first_login = $user['is_first_login']; 
        $_SESSION['user'] = [
            'email' => $user['email'],
            'type' => $userType,
            'is_first_login' => $is_first_login
        ];
        $response['success'] = true;
        $response['userType'] = $userType;
        $response['message'] = 'Login successful';
        $response['is_first_login'] = $is_first_login;
    } else {
        // $response['message'] = "Please make sure that email: $email and password: $password are correct. : $userType";
        $response['message'] = "Incorrect Email or Password : $userType";
    }
} else {
    $response['message'] = 'Invalid request';
}

echo json_encode($response);
$conn = null;
?>
