<?php

// Enable CORS
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    }

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }
    exit(0);
}

// Ensure headers are set before any output
header('Content-Type: application/json');

require_once '../Connection/connection.php';

if (isset($_GET['delete'])) {
    $delete_id = $_GET['delete'];

    //$status = 'unavilable';

    try {
        $delete_query = "Update `products` SET status ='unavailable' WHERE productID= ?";
        $delete_stmt = $conn->prepare($delete_query);
       // $delete_stmt->bindValue(1,$status);
        $delete_stmt->bindValue(1,$delete_id);
        $delete_stmt->execute();

        if ($delete_stmt->rowCount() > 0) {
            echo json_encode(["success" => "Product deleted successfully."]);
        } else {
            echo json_encode(["error" => "Product not deleted."]);
        }
    } catch (PDOException $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
}
?>
