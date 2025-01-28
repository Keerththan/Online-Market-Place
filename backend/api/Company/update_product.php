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

header('Content-Type: application/json');

require_once '../Connection/connection.php'; // Adjust path if needed

$response = [];

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['update_product_id'])) {
    $update_product_id = $_POST['update_product_id'];
    $update_product_name = htmlspecialchars($_POST['update_product_name']);
    $update_product_price = htmlspecialchars($_POST['update_product_price']);
    $update_product_quantity = htmlspecialchars($_POST['update_product_quantity']);
    $update_product_netweight = htmlspecialchars($_POST['update_product_netweight']);
    $old_imagepath =$_POST['imagePath'];

    
    if (isset($_FILES['image']) && $_FILES['image']['name']) {
        $stmt = $conn->prepare('SELECT * FROM products WHERE productID = ?');
        $stmt->bindParam(1, $update_product_id);
        $stmt->execute();
        $product = $stmt->fetch(PDO::FETCH_ASSOC);
        function deleteFilesInDirectory($dir)
        {
            if (is_dir($dir)) {
                $files = scandir($dir);
                foreach ($files as $file) {
                    if ($file != '.' && $file != '..') {
                        unlink($dir . '/' . $file);
                    }
                }
            }
        }

        // Save new image
        $image =$_FILES['image']['name'] ;
        $imageDir = '../../../frontend/public/images/products/' .$update_product_id;
        $imagePath_move = $imageDir . '/' . $image;
        // $imagePath_move = '../../../frontend/public/images/customer/' . $user_id . '/' . $image;
        $imagePath = '../../../public/images/products/' .$update_product_id . '/' . $image;
        // echo json_encode($imagePath);
        // exit;
        if (file_exists($imageDir)) {
            // Delete all files in the directory
            deleteFilesInDirectory($imageDir);
            // Remove the directory itself
            rmdir($imageDir);
        }
        if (!file_exists(dirname($imagePath_move))) {
            mkdir(dirname($imagePath_move), 0777, true);
        }
        move_uploaded_file($_FILES['image']['tmp_name'], $imagePath_move);
    } 
    try {
            if(!$imagePath){
                $imagePath=$old_imagepath;
            }
            $update_query = "UPDATE `products` SET productName = :product_name, productPrice = :product_price, productQuantity = :product_quantity, productNetweight = :product_netweight, productImage =:product_image WHERE productID = :product_id";
            $update_stmt = $conn->prepare($update_query);
            $update_success = $update_stmt->execute([
                ':product_name' => $update_product_name,
                ':product_price' => $update_product_price,
                ':product_quantity' => $update_product_quantity,
                ':product_netweight' => $update_product_netweight,
                ':product_image' => $imagePath,
                ':product_id' => $update_product_id
            ]);

            if ($update_success) {
                $response = ["success" => "Product updated successfully."];
            } else {
                $response = ["error" => "There is some error updating the product."];
            }
        
    } catch (PDOException $e) {
        $response = ["error" => $e->getMessage()];
    }
} else {
    $response = ["error" => "Invalid request method or missing product ID."];
}

echo json_encode($response);
?>
