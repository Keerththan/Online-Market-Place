<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include '../Connection/connection.php';

$userType = 'Shop';
    try {

        // Count uncheck Requests
        $pstmt = $conn->prepare("SELECT COUNT(*) as unreadCount FROM registration_requests WHERE status='pending' and userType =? ");
        $pstmt->bindParam(1, $userType);
        $pstmt->execute();

        $result = $pstmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode(['unreadCount' => $result['unreadCount']]);

    } catch (Exception $e) {
        echo json_encode([ 'message'=>'Error fetching Request company Count', 'error'=>$e->getMessage()]);
    
    }
