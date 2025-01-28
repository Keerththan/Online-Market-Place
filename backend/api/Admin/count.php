<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");

include '../Connection/connection.php';

if($_SERVER['REQUEST_METHOD']=='POST'){

    $today = date('Y-m-d');
    $response = [];
    try {
        $sql = "SELECT COUNT(*) as count FROM orders WHERE DATE(orderDate)=:today";
        $pstmt = $conn->prepare($sql);
        $pstmt->bindParam(':today', $today);
        $pstmt->execute();
        $orders = $pstmt->fetch(PDO::FETCH_ASSOC);
        $response['orders'] = $orders['count'];
        
    } catch (\Throwable $th) {
        $response['ordersError'] = 'Error fetching orders count';
    }

    try {
        $sql = "SELECT COUNT(*) as count FROM customers";
        $pstmt = $conn->prepare($sql);
        $pstmt->execute();
        $customers = $pstmt->fetch(PDO::FETCH_ASSOC)['count'];
        $response['customers'] = $customers;
        
    } catch (\Throwable $th) {
        $response['customersError'] = 'Error fetching customers count';
    } 

    try {
        $sql = "SELECT COUNT(*) as count FROM companyowners";
        $pstmt = $conn->prepare($sql);
        $pstmt->execute();
        $company = $pstmt->fetch(PDO::FETCH_ASSOC)['count'];
        $response['company'] = $company;
        
    } catch (\Throwable $th) {
        $response['companyError'] = 'Error fetching company count';
    } 

  
    try {
        $sql = "SELECT SUM(totalAmount) as total_amount FROM bills WHERE DATE(billDate) = :today";
        $pstmt = $conn->prepare($sql);
        $pstmt->bindParam(':today',$today);
        $pstmt->execute();
        $result = $pstmt->fetch(PDO::FETCH_ASSOC);
        $amount = $result['total_amount'] ? $result['total_amount'] : 0;
        $response['amount'] = $amount;
        
    } catch (\Throwable $th) {
        $response['salesError'] = 'Error fetching sales count';
    } 
    
   
   echo json_encode($response); 


}

?>