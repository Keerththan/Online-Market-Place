<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


include '../Connection/connection.php';

try{
    $stmt = $conn->prepare('SELECT * FROM customers');
    $stmt->execute();
    $customers = $stmt->fetchAll(PDO::FETCH_ASSOC); 

    echo json_encode(['success'=> true, 'data'=>$customers]);
    

} catch (Exception $e) {
    echo json_encode(['success'=> false, 'message'=>'Error fetching customers', 'error'=>$e->getMessage()]);

}



?>
