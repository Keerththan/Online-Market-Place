<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");

include '../Connection/connection.php';

if($_SERVER['REQUEST_METHOD']=='POST'){

    
    $response = [];
    try {
        $sql = "SELECT COUNT(*) as count FROM orders WHERE status='pending'";
        $pstmt = $conn->prepare($sql);
       
        $pstmt->execute();
        $pending = $pstmt->fetch(PDO::FETCH_ASSOC);
        $response['pending'] = $pending['count'];
        
    } catch (\Throwable $th) {
        $response['pendingError'] = 'Error counting  pending';
    }

    try {
        $sql = "SELECT COUNT(*) as count FROM orders WHERE status='delivery'";
        $pstmt = $conn->prepare($sql);
       
        $pstmt->execute();
        $delivery = $pstmt->fetch(PDO::FETCH_ASSOC);
        $response['delivery'] = $delivery['count'];
        
    } catch (\Throwable $th) {
        $response['deliveryError'] = 'Error counting delivery';
    }

    
    
   
   echo json_encode($response); 


}

?>