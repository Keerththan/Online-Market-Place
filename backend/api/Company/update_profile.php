<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

header('Content-Type: application/json');
include '../Connection/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $address = $_POST['address'];
    $number = $_POST['number'];
    $user_id = $_POST['user_id'];
    $businessInfo=$_POST['businessInfo'];
    $imagePath = null;

    if (isset($_FILES['image'])) {
        // Check if the user already has an image and delete it
        
        $stmt = $conn->prepare('SELECT * FROM companyowners WHERE companyOwnerID = ?');
        $stmt->bindParam(1, $user_id);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && $user['image']) {
            unlink($user['image']);
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
        $image = $_FILES['image']['name'];
        $imageDir = '../../../frontend/public/images/company/' . $user_id;
        $imagePath_move = $imageDir . '/' . $image;
        // $imagePath_move = '../../../frontend/public/images/customer/' . $user_id . '/' . $image;
        $imagePath = '../../../public/images/company/' . $user_id . '/' . $image;
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

    // Update user information in the database
    $query = "UPDATE companyowners SET email = ?,  companyAddress = ?, businessInfo=?, companyContactNumber = ?" . ($imagePath ? ", image = ?" : "") . " WHERE companyOwnerID = ?";
    $params = [$email, $address, $businessInfo, $number];

    if ($imagePath) {
        $params[] = $imagePath;
    }
    $params[] = $user_id;
   
    $stmt = $conn->prepare($query);
    // echo json_encode($stmt->execute($params));
    // exit;
    if ($stmt->execute($params)) {
        $sql=" SELECT * FROM companyowners WHERE companyOwnerID = ?";
        $statement=$conn->prepare($sql);
        $statement->bindParam(1, $user_id);
        $statement->execute();
        $user = $statement->fetch(PDO::FETCH_ASSOC);
        echo json_encode(['message' => $user]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to update profile']);
    }
}
?>
