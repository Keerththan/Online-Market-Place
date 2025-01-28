<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Specify your frontend URL here
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    include('../Connection/connection.php');
    
    $data = json_decode(file_get_contents('php://input'), true);
    $email = $data['email'];

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        
    function checkEmailDomain($email)
    {
        list($user, $domain) = explode('@', $email);
        return checkdnsrr($domain, 'MX');
    }

    function email_verify($email)
    {
        if (checkEmailDomain($email)) {
            return true;
        } else {
            return false;
        }
    }
    if(email_verify($email)) {  
        $sql = "SELECT 'admins' AS user_type FROM admins WHERE email = ?
                UNION
                SELECT 'companyowners' AS user_type FROM companyowners WHERE email = ?
                UNION
                SELECT 'customers' AS user_type FROM customers WHERE email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(1, $email);
        $stmt->bindParam(2, $email);
        $stmt->bindParam(3, $email);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $result = $stmt->fetch();
        if($result) {
            echo json_encode(['success' => false, 'message' => 'This user Email is already exists']);
        } else { 
            echo json_encode(['success'=> true,'message'=> 'This email verified successfully' ]);
        }
    }else{
        $errorInfo = $stmt->errorInfo();
        echo json_encode(['success'=> false,'message'=> 'Failed email validation , input valid email address','error' => $errorInfo[2]]);
    }
}else {
    echo json_encode(['success'=> false,'message'=> 'Incorrect email, input valid email address']);
}
} 
