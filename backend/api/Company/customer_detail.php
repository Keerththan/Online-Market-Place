<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include '../Connection/connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Fetch the raw POST data
    $data = json_decode(file_get_contents("php://input"), true);
    
    // Check if companyOwnerID is set
    if (!isset($data['companyOwnerID'])) {
        echo json_encode(['error' => 'companyOwnerID is required']);
        exit;
    }
    
    $companyOwnerID = $data['companyOwnerID'];
    
    try {
        // Prepare the SQL query to get distinct customer details based on companyOwnerID
        $pstmt = $conn->prepare("
            SELECT *
            FROM customers
            JOIN orders ON customers.customerID = orders.customerID
            JOIN orderItems ON orders.orderID = orderItems.orderID
            JOIN products ON orderItems.productID = products.productID
            WHERE products.companyOwnerID = ?
            GROUP BY customers.customerID
        ");
        
        $pstmt->bindParam(1, $companyOwnerID);
        $pstmt->execute();
        $customers = $pstmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($customers);
    } catch (PDOException $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
}
