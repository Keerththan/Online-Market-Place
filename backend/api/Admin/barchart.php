<?php 
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");

include '../Connection/connection.php';

if($_SERVER['REQUEST_METHOD']=='POST'){
    try {
        
        $sql = "SELECT companyowners.companyName, COUNT(products.productID) as productCount 
        FROM products 
        INNER JOIN companyowners ON products.companyOwnerID = companyowners.companyOwnerID 
        GROUP BY companyowners.companyName";
        $pstmt = $conn->prepare($sql);
        
        $pstmt->execute();
        $count = $pstmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(['success'=> true, 'data'=>$count]);
        
    } catch (\Throwable $th) {
       echo json_encode(['success'=>false, 'error'=> 'Error in count']);
    }

   

    


}

?>