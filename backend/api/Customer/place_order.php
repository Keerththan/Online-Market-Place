<?php
// Include database connection file
include '../config/cors.php';
include '../Connection/DbConnector.php';
$db = new DbConnector();
$pdo = $db->getConnection();

$data = json_decode(file_get_contents("php://input"));

$customer_id = $data->customer_id;
$items = $data->items;

try {
    $pdo->beginTransaction();

    // Insert into orders table
    $query = "INSERT INTO ordersS (customer_id, total_amount) VALUES (:customer_id, 0)";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':customer_id', $customer_id, PDO::PARAM_INT);
    $stmt->execute();
    $order_id = $pdo->lastInsertId();

    $total_amount = 0;

    // Insert each cart item into order_items table
    foreach ($items as $item) {
        $item_id = $item->item_id;
        $quantity = $item->quantity;
        $price = $item->price;
        $total_price = $price * $quantity;

        $total_amount += $total_price;

        $query = "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (:order_id, :item_id, :quantity, :price)";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':order_id', $order_id, PDO::PARAM_INT);
        $stmt->bindParam(':item_id', $item_id, PDO::PARAM_INT);
        $stmt->bindParam(':quantity', $quantity, PDO::PARAM_INT);
        $stmt->bindParam(':price', $price, PDO::PARAM_STR);
        $stmt->execute();
    }

    // Update order total
    $query = "UPDATE orders SET total_amount = :total_amount WHERE id = :order_id";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':total_amount', $total_amount, PDO::PARAM_STR);
    $stmt->bindParam(':order_id', $order_id, PDO::PARAM_INT);
    $stmt->execute();

    $pdo->commit();

    // Prepare invoice details
    $invoice = [
        'customer_id' => $customer_id,
        'total_amount' => $total_amount,
        'items' => $items
    ];

    echo json_encode(['success' => true, 'invoice' => $invoice]);
} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
