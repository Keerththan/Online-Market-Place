<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include '../Connection/connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->orderId) && isset($data->deliveryDate)) {
        $orderId = $data->orderId;
        $deliveryDate = $data->deliveryDate;

        // Prepare the SQL update statement
        $query = "UPDATE orders SET deliveryDate = :deliveryDate WHERE orderID = :orderId";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':deliveryDate', $deliveryDate);
        $stmt->bindParam(':orderId', $orderId);

        // Execute the query
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Delivery date updated successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to update delivery date']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid input']);
    }
} 
?>
