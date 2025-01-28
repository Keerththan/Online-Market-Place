<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include '../Connection/connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    

    if ($input['action'] === 'load_data' && isset($input['productId'])) {
        $productId = $input['productId'];

        $avgUserRatings = 0;
        $totalReviews = 0;
        $ratingsList = array();

        // Fetch average ratings product
        $sql = "SELECT AVG(rating) as avgUserRatings FROM product_reviews WHERE productID = :productId";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':productId', $productId);
        if ($stmt->execute()) {
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($result) {
                $avgUserRatings = round($result['avgUserRatings'], 1);
            }
        } else {
            echo json_encode(["error" => "Error fetching average ratings", "details" => $stmt->errorInfo()]);
            exit;
        }

        // Fetch all reviews for the product
        $sql = "SELECT * FROM review_table WHERE productID = :productId ORDER BY datetime DESC";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':productId', $productId);
        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $ratingsList[] = array(
                    'rating' => $row['rating'],
                    'name' => $row['name'],
                    'message' => $row['reviewText'],
                    'datetime' => date('l jS, F Y h:i:s A', strtotime($row['reviewDate']))
                );
            }
        } else {
            echo json_encode(["error" => "Error fetching reviews", "details" => $stmt->errorInfo()]);
            exit;
        }

        $totalReviews = count($ratingsList);

        echo json_encode(array(
            'avgUserRatings' => $avgUserRatings,
            'totalReviews' => $totalReviews,
            'ratingsList' => $ratingsList
        ));
    }
}
?>
