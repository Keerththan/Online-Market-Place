<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


include '../Connection/connection.php';

try{
    $sql = 'SELECT orders.*, bills.totalAmount FROM orders INNER JOIN bills ON orders.orderID = bills.orderID';
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC); 

    echo json_encode(['success'=> true, 'data'=>$orders]);
    

} catch (Exception $e) {
    echo json_encode(['success'=> false, 'message'=>'Error fetching customers', 'error'=>$e->getMessage()]);

}



?>

