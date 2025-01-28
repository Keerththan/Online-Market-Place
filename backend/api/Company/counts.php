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

// Respond with a success status for OPTIONS
require_once '../Connection/connection.php';

$counts = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Fetch the raw POST data
    $data = json_decode(file_get_contents("php://input"), true);

    // Check if companyOwnerID is set
    if (!isset($data['companyOwnerID'])) {
        echo json_encode(['error' => 'companyOwnerID is missing']);
        exit;
    }

    $companyOwnerID = $data['companyOwnerID'];
    $status = 'available';

    try {
        // Fetch product count
        $pstmt = $conn->prepare("SELECT COUNT(*) AS product_count FROM products WHERE companyOwnerID = ? and status = ?");
        $pstmt->bindParam(1, $companyOwnerID);
        $pstmt->bindParam(2, $status);
        $pstmt->execute();
        $row = $pstmt->fetch(PDO::FETCH_ASSOC);
        $counts['products'] = $row['product_count'];

        // Fetch customer count
        $pstmt = $conn->prepare("SELECT COUNT(DISTINCT customers.customerID) AS count FROM customers JOIN orders ON customers.customerID = orders.customerID JOIN orderItems ON orders.orderID = orderItems.orderID JOIN products ON orderItems.productID = products.productID WHERE products.companyOwnerID = ?");
        $pstmt->bindParam(1, $companyOwnerID);
        $pstmt->execute();
        $row = $pstmt->fetch(PDO::FETCH_ASSOC);
        $counts['customers'] = $row['count'];

        // Fetch order count
        $pstmt = $conn->prepare("SELECT COUNT(DISTINCT orderItems.orderID) AS order_count FROM products JOIN orderItems ON products.productID = orderItems.productID WHERE products.companyOwnerID = ?");
        $pstmt->bindParam(1, $companyOwnerID);
        $pstmt->execute();
        $row = $pstmt->fetch(PDO::FETCH_ASSOC);
        $counts['orders'] = $row['order_count'];

        // Fetch delivery count
        $pstmt = $conn->prepare("SELECT COUNT(DISTINCT orders.orderID) AS delivery_order_count FROM products JOIN orderItems ON products.productID = orderItems.productID JOIN orders ON orderItems.orderID = orders.orderID WHERE products.companyOwnerID = ? AND orders.status = 'delivered'");
        $pstmt->bindParam(1, $companyOwnerID);
        $pstmt->execute();
        $row = $pstmt->fetch(PDO::FETCH_ASSOC);
        $counts['delivery'] = $row['delivery_order_count'];

        // fetch pie chart count
        $pstmt = $conn->prepare("SELECT COUNT(DISTINCT orders.orderID) AS pending_order_count FROM products JOIN orderItems ON products.productID = orderItems.productID JOIN orders ON orderItems.orderID = orders.orderID WHERE products.companyOwnerID = ? AND orders.status = 'pending'");
        $pstmt->bindParam(1, $companyOwnerID);
        $pstmt->execute();
        $row = $pstmt->fetch(PDO::FETCH_ASSOC);
        $counts['pending'] = $row['pending_order_count'];

        $pstmt = $conn->prepare("SELECT COUNT(DISTINCT orders.orderID) AS processing_order_count FROM products JOIN orderItems ON products.productID = orderItems.productID JOIN orders ON orderItems.orderID = orders.orderID WHERE products.companyOwnerID = ? AND orders.status = 'processing'");
        $pstmt->bindParam(1, $companyOwnerID);
        $pstmt->execute();
        $row = $pstmt->fetch(PDO::FETCH_ASSOC);
        $counts['processing'] = $row['processing_order_count'];

        $pstmt = $conn->prepare("SELECT COUNT(DISTINCT orders.orderID) AS delivered_order_count FROM products JOIN orderItems ON products.productID = orderItems.productID JOIN orders ON orderItems.orderID = orders.orderID WHERE products.companyOwnerID = ? AND orders.status = 'delivered'");
        $pstmt->bindParam(1, $companyOwnerID);
        $pstmt->execute();
        $row = $pstmt->fetch(PDO::FETCH_ASSOC);
        $counts['delivered'] = $row['delivered_order_count'];

        echo json_encode($counts);

    } catch (PDOException $e) {
        echo json_encode(array("error" => "Query failed: " . $e->getMessage()));
    }
}
?>