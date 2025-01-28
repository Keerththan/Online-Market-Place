<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


include '../Connection/connection.php';



try{
    $stmt = $conn->prepare('SELECT * FROM companyowners');
    $stmt->execute();
    $company = $stmt->fetchAll(PDO::FETCH_ASSOC); 

    echo json_encode(['success'=> true, 'data'=>$company]);
    

} catch (Exception $e) {
    echo json_encode(['success'=> false, 'message'=>'Error fetching company', 'error'=>$e->getMessage()]);

}



?>
