<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


include '../Connection/connection.php';

if (isset(($_GET['id']))){
    $id = $_GET['id'];

    try{
        $stmt = $conn->prepare('SELECT * FROM registration_requests Where id = :id ');
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        $Requestcompany = $stmt->fetchAll(PDO::FETCH_ASSOC); 

        if($Requestcompany) {
            echo json_encode(['success'=> true, 'data'=>$Requestcompany]);
        } else{
            echo json_encode(['success'=> false, 'message'=>'Request Company not found']);
        }
    
    } catch (Exception $e) {
        echo json_encode(['success'=> false, 'message'=>'Error fetching Request company', 'error'=>$e->getMessage()]);
    
    }
} else{
    echo json_encode(['success'=> false, 'message'=>'No Request Company ID Provided']);
}




?>
