<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../Connection/connection.php';

$counts = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Fetch the raw POST data
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['companyOwnerID'])) {
        echo json_encode(['error' => 'companyOwnerID is missing']);
        exit;
    }

    $companyOwnerID = $data['companyOwnerID'];

    try {
        // Bar Chart SQL (Orders count for the last 6 months by status)
        $barChartQuery = "
            SELECT 
                DATE_FORMAT(orders.orderDate, '%Y-%m') AS order_month,
                SUM(CASE WHEN orders.status = 'pending' THEN 1 ELSE 0 END) AS pending,
                SUM(CASE WHEN orders.status = 'processing' THEN 1 ELSE 0 END) AS processing,
                SUM(CASE WHEN orders.status = 'delivered' THEN 1 ELSE 0 END) AS delivered
            FROM products 
            JOIN orderItems ON products.productID = orderItems.productID 
            JOIN orders ON orderItems.orderID = orders.orderID 
            WHERE products.companyOwnerID = ? 
            AND orders.orderDate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
            GROUP BY order_month
            ORDER BY order_month;
        ";
        $stmt = $conn->prepare($barChartQuery);
        $stmt->bindParam(1, $companyOwnerID);
        $stmt->execute();
        $orderData = $stmt->fetchAll(PDO::FETCH_ASSOC);


        // Combine bar chart data and pie chart counts into one response
        echo json_encode([
            'orderData' => $orderData,
            'counts' => $counts
        ]);

    } catch (PDOException $e) {
        echo json_encode(["error" => "Query failed: " . $e->getMessage()]);
    }
}
?>
