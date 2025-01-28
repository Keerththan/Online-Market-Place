<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");
// include('../config/cors.php');
include('../Connection/connection.php');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Check if the request method is DELETE
if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['customer_id']) && isset($data['item_id'])) {
        $customer_id = $data['customer_id'];
        $item_id = $data['item_id'];

        // // Delete query
        // $query = "DELETE FROM cart_items WHERE customer_id = :customer_id AND id = :item_id";
        // $stmt = $conn->prepare($query);
        // $stmt->bindParam(':customer_id', $customer_id);
        // $stmt->bindParam(':item_id', $item_id);

        // Prepare and execute the DELETE query
        $query = "DELETE FROM cart_items WHERE customer_id = :customer_id AND id = :item_id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':customer_id', $customer_id);
        $stmt->bindParam(':item_id', $item_id);

        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(["message" => "Item removed from cart successfully."]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Failed to remove item from cart."]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Invalid or missing customer ID or item ID."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["message" => "Method Not Allowed."]);
}
?>
