<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


include '../Connection/connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (!isset($data['companyOwnerID'])) {
        echo json_encode(['error' => $data]);
        exit;
    }
    
    $companyOwnerID = $data['companyOwnerID'];
    
    try {
        $stmt = $conn->prepare("SELECT * FROM `products` WHERE companyOwnerID = ? and STATUS = 'available'" );
        $stmt->execute([$companyOwnerID]);
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($products);
    } catch (PDOException $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
    }


?>
