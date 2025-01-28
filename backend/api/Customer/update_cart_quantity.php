<?php
// Include database connection file
include '../config/cors.php';
include '../Connection/DbConnector.php';

$data = json_decode(file_get_contents("php://input"));
// $user_id = $data->customer_id;
$item_id = $data->id;
$quantity = $data->quantity;
$db=new DbConnector();
$pdo=$db->getConnection();
$query = "UPDATE cart_items SET quantity = :quantity WHERE id = :item_id";
$stmt = $pdo->prepare($query);
$stmt->bindParam(':quantity', $quantity, PDO::PARAM_INT);
$stmt->bindParam(':item_id', $item_id, PDO::PARAM_INT);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>
