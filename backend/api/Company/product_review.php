<?php
// Enable CORS
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400'); // cache for 1 day
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

// Handle GET requests for product reviews
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    if (isset($_GET['product_id'])) {
        $productID = $_GET['product_id'];
        error_log("Received product ID: " . $productID); // Log the received product ID
    
        $sql = "SELECT * FROM products WHERE productID = :productID";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':productID', $productID);
        
        if ($stmt->execute()) {
            $product = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($product) {
                echo json_encode([$product]); // Return product in an array
            } else {
                echo json_encode([]); // Return empty array if not found
            }
        } 
    } 
    
}


// Handle POST requests for fetching products by companyOwnerID
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);



    if ($input['action'] === 'load_data' && isset($input['productID'])) {
        $productID = $input['productID'];


        $avgUserRatings = 0;
        $totalReviews = 0;
        $ratingsList = array();


        // Fetch average rating for the specific productID
        $sql = "SELECT AVG(rating) as avgUserRatings FROM product_reviews WHERE productID = :productID";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':productID', $productID);

        if ($stmt->execute()) {
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($result) {
                $avgUserRatings = round($result['avgUserRatings'], 1);
            }
        } else {
            echo json_encode(["error" => "Error fetching average ratings", "details" => $stmt->errorInfo()]);
            exit;
        }

        // Fetch all reviews for the specific productID
        $sql = "SELECT pr.*, c.customerName, c.image 
                  FROM product_reviews pr
                  JOIN customers c ON pr.customerID = c.customerID
                  WHERE pr.productID = :productID
                  ORDER BY pr.reviewDate DESC";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':productID', $productID);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $ratingsList[] = $row;
            }
        } else {
            echo json_encode(["error" => "Error fetching reviews", "details" => $stmt->errorInfo()]);
            exit;
        }

        // Fetch the total number of reviews for the specific productID
        $sql = "SELECT COUNT(*) as totalReviews FROM product_reviews WHERE productID = :productID";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':productID', $productID);

        if ($stmt->execute()) {
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($result) {
                $totalReviews = $result['totalReviews'];
            }
        } else {
            echo json_encode(["error" => "Error fetching total reviews", "details" => $stmt->errorInfo()]);
            exit;
        }

        // Return the response as JSON
        echo json_encode(array(
            'avgUserRatings' => $avgUserRatings,
            'totalReviews' => $totalReviews,
            'ratingsList' => $ratingsList
        ));
    } else {
        echo json_encode(["error" => "Missing product_id in GET request"]);
    }
}

?>