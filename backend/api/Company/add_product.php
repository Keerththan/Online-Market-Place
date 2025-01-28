<?php

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}


require_once '../Connection/connection.php';

header('Content-Type: application/json');

// Function to create directory if not exists
function ensureDirectoryExists($directory)
{
    if (!file_exists($directory)) {
        mkdir($directory, 0777, true); // Creates directory recursively
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['product_name']) || !isset($_POST['product_price']) || !isset($_FILES['product_image']) || !isset($_POST['quantity']) || !isset($_POST['product_category']) || !isset($_POST['net_weight']) || !isset($_POST['companyOwnerID'])) {
        echo json_encode(['message' => 'Missing required fields']);
        exit();
    }

    $product_name = trim($_POST['product_name']);
    $product_price = trim($_POST['product_price']);
    $product_image = $_FILES['product_image'];
    $quantity = trim($_POST['quantity']);
    $product_category = trim($_POST['product_category']);
    $net_weight = trim($_POST['net_weight']);
    $companyOwnerID = trim($_POST['companyOwnerID']);

    $product_name = htmlspecialchars($product_name);
    $product_price = htmlspecialchars($product_price);
    $quantity = htmlspecialchars($quantity);
    $product_category = htmlspecialchars($product_category);
    $net_weight = htmlspecialchars($net_weight);

    if (!is_numeric($product_price) || empty($product_name) || empty($product_image) || empty($quantity) || empty($product_category) || empty($net_weight)) {
        echo json_encode(['message' => 'Invalid input!']);
        exit();
    }

    $status = 'available';

    try {
        $check_existing_query = $conn->prepare("SELECT * FROM `products` WHERE (productName = ? AND productNetweight = ?) OR productImage = ?");
        $check_existing_query->execute([$product_name, $net_weight, $product_image]);

        if ($check_existing_query->rowCount() > 0) {
            echo json_encode(['message' => 'This product already exists!']);
            exit();
        } else {
            

            $highest_id_query = $conn->prepare("SELECT productID FROM `products` ORDER BY productID DESC LIMIT 1");
            $highest_id_query->execute();
            $highest_id_row = $highest_id_query->fetch(PDO::FETCH_ASSOC);

            

            if ($highest_id_row) {
                $highest_id = $highest_id_row['productID'];
                $numeric_part = (int)substr($highest_id, 1); // Get the numeric part of the highest ID
                $new_id = 'P' . str_pad($numeric_part + 1, 3, '0', STR_PAD_LEFT); // Increment and pad with zeros
            } else {
                $new_id = 'P001'; // If no product exists, start with P001
            }

     

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
            $image =$product_image['name'] ;
            $imageDir = '../../../frontend/public/images/products/' . $new_id;
            $imagePath_move = $imageDir . '/' . $image;
            $imagePath = '../../../public/images/products/' . $new_id . '/' . $image;
            if (file_exists($imageDir)) {
                // Delete all files in the directory
                deleteFilesInDirectory($imageDir);
                // Remove the directory itself
                rmdir($imageDir);
            }
            if (!file_exists(dirname($imagePath_move))) {
                mkdir(dirname($imagePath_move), 0777, true);
            }
            move_uploaded_file($product_image['tmp_name'], $imagePath_move);

     

            $insert_query = $conn->prepare("INSERT INTO `products` (productID, productName, productPrice, productImage, productQuantity, productCategory, productNetweight, companyOwnerID , status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $insert_success = $insert_query->execute([$new_id, $product_name, $product_price, $imagePath, $quantity, $product_category, $net_weight, $companyOwnerID, $status]);

            if ($insert_success) {
                echo json_encode(['message' => 'Product inserted successfully.']);
            } else {
                echo json_encode(['message' => 'There was an error inserting the product']);
            }
            exit();
        }
    } catch (PDOException $e) {
        echo json_encode(['message' => 'Error: ' . $e->getMessage()]);
        exit();
    }
}

