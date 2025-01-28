<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight OPTIONS request for CORS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

include '../Connection/connection.php'; // Including the database connection

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the input from the request body as JSON
    $input = json_decode(file_get_contents('php://input'), true);
    $email = $input['email'];

    // Validate email format
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        try {
            // Check if the email already exists in the 'subscriptions' table
            $checkStmt = $conn->prepare("SELECT * FROM subscriptions WHERE email = :email");
            $checkStmt->bindParam(':email', $email);
            $checkStmt->execute();
            
            // If the email already exists, return an error message
            if ($checkStmt->rowCount() > 0) {
                echo json_encode(["status" => "error", "message" => "Email already exists in the subscriptions list."]);
            } else {
                // Insert the email into the 'subscriptions' table
                $stmt = $conn->prepare("INSERT INTO subscriptions (email) VALUES (:email)");
                $stmt->bindParam(':email', $email);

                // If the insertion is successful, return success
                if ($stmt->execute()) {
                    echo json_encode(["status" => "success", "message" => "Email saved successfully."]);
                } else {
                    echo json_encode(["status" => "error", "message" => "Failed to save email."]);
                }
            }
        } catch (PDOException $e) {
            // If there's an error in the database interaction, return an error message
            echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
        }
    } else {
        // Return an error if the email is not valid
        echo json_encode(["status" => "error", "message" => "Invalid email address."]);
    }
} else {
    // If the request method is not POST, return an error message
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
