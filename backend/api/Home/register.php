<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
include('User.php');
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}


$input = json_decode(file_get_contents('php://input'), true);

$companyName = $input['companyName'];
$shopName = $input['shopName'];
$username = $input['userName'];
$email = $input['email'];
$address = $input['address'];
$contactNumber = $input['contactNumber'];
$district = $input['district'];
$userType = $input['selectedUserType'];

if (!preg_match('/^\d{10}$/', $contactNumber)) {
    echo json_encode(['success' => false, 'message' => 'Invalid contact number format']);
    exit();
}



try {
    $businessName = !empty($companyName) ? $companyName : $shopName;


    $status = 'pending';
    $reguser = new User();
    $result = $reguser->register(
        $userType,
        $username,
        $email,
        $businessName,
        $address,
        $contactNumber,
        $district,
        $status
    );

    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Registration successful']);
    } else {
        $errorInfo = $stmt->errorInfo();
        echo json_encode(['success' => false, 'message' => 'Error in registration', 'error' => $errorInfo[2]]);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
