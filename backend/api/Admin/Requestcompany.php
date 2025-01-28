<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


include '../Connection/connection.php';

try{
    $stmt = $conn->prepare('SELECT * FROM registration_requests WHERE userType="Company" and STATUS = "pending"');
    $stmt->execute();
    $Requestcompany = $stmt->fetchAll(PDO::FETCH_ASSOC); 

    echo json_encode(['success'=> true, 'data'=>$Requestcompany]);
    

} catch (Exception $e) {
    echo json_encode(['success'=> false, 'message'=>'Error fetching Request company', 'error'=>$e->getMessage()]);

}



?>
