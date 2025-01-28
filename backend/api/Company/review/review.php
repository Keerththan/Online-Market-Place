<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../Connection/connection.php';


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Handle preflight requests
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['rating_value'])) {
    $rating_value = $_POST['rating_value'];
    $userName = $_POST['userName'];
    $userMessage = $_POST['userMessage'];
    $now = date('Y-m-d H:i:s');

    $sql = "INSERT INTO review_table (productID,name, rating, reviewText, reviewDate) VALUES (:userName, :rating_value, :userMessage, :now)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':userName', $userName);
    $stmt->bindParam(':rating_value', $rating_value);
    $stmt->bindParam(':userName', $userName);
    $stmt->bindParam(':rating_value', $rating_value);
    $stmt->bindParam(':userMessage', $userMessage);
    $stmt->bindParam(':now', $now);

    if ($stmt->execute()) {
        echo "New Review Added Successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $stmt->errorInfo();
    }
}
// avgRatings
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    $avgRatings = 0;
    $avgUserRatings = 0;
    $totalReviews = 0;
    $totalRatings5 = 0;
    $totalRatings4 = 0;
    $totalRatings3 = 0;
    $totalRatings2 = 0;
    $totalRatings1 = 0;
    $ratingsList = array();
    $totalRatings_avg = 0;

    $sql = "SELECT * FROM product_reviews ORDER BY reviewID DESC";
    $stmt = $conn->query($sql);

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $ratingsList[] = array(
            'review_id' => $row['review_id'],
            'name' => $row['name'],
            'rating' => $row['rating'],
            'message' => $row['reviewText'],
            'datetime' => date('l jS \of F Y h:i:s A', strtotime($row['reviewDate']))
        );
        if ($row['rating'] == '5') {
            $totalRatings5++;
        }
        if ($row['rating'] == '4') {
            $totalRatings4++;
        }
        if ($row['rating'] == '3') {
            $totalRatings3++;
        }
        if ($row['rating'] == '2') {
            $totalRatings2++;
        }
        if ($row['rating'] == '1') {
            $totalRatings1++;
        }
        $totalReviews++;
        $totalRatings_avg += intval($row['rating']);
    }
    $avgUserRatings = $totalRatings_avg / $totalReviews;

    $output = array(
        'avgUserRatings' => number_format($avgUserRatings, 1),
        'totalReviews' => $totalReviews,
        'totalRatings5' => $totalRatings5,
        'totalRatings4' => $totalRatings4,
        'totalRatings3' => $totalRatings3,
        'totalRatings2' => $totalRatings2,
        'totalRatings1' => $totalRatings1,
        'ratingsList' => $ratingsList
    );

    echo json_encode($output);
}

$conn = null;
?>



<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


require_once 'connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);


$db = new DbConnector();
$conn = $db->getConnection();

if(isset($_POST['rating_value'])) {
    $rating_value = $_POST['rating_value'];
    $userName = $_POST['userName'];
    $userMessage = $_POST['userMessage'];
    $now = time();

    $sql = "INSERT INTO review_table (name, rating, message, datetime) VALUES (:name, :rating, :message, :datetime)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':name', $userName);
    $stmt->bindParam(':rating', $rating_value);
    $stmt->bindParam(':message', $userMessage);
    $stmt->bindParam(':datetime', $now);

    if ($stmt->execute()) {
        echo "New Review Added Successfully";
    } else {
        echo "Error: " . $stmt->errorInfo();
    }
}

if(isset($_POST['action'])) {
    $avgRatings = 0;
    $avgUserRatings = 0;
    $totalReviews = 0;
    $totalRatings5 = 0;
    $totalRatings4 = 0;
    $totalRatings3 = 0;
    $totalRatings2 = 0;
    $totalRatings1 = 0;
    $ratingsList = array();
    $totalRatings_avg = 0;

    $sql = "SELECT * FROM review_table ORDER BY review_id DESC";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($reviews as $review) {
        $ratingsList[] = array(
            'rating' => $review['rating'],
            'name' => $review['name'],
            'message' => $review['message'],
            'datetime' => date('l jS, F Y h:i:s A', $review['datetime'])
        );

        if ($review['rating'] == '5') {
            $totalRatings5++;
        }
        if ($review['rating'] == '4') {
            $totalRatings4++;
        }
        if ($review['rating'] == '3') {
            $totalRatings3++;
        }
        if ($review['rating'] == '2') {
            $totalRatings2++;
        }
        if ($review['rating'] == '1') {
            $totalRatings1++;
        }
        $totalRatings_avg += $review['rating'];
        $totalReviews++;
    }
    $avgUserRatings = round($totalRatings_avg / $totalReviews, 1);

    $output = array(
        'avgUserRatings' => $avgUserRatings,
        'totalReviews' => $totalReviews,
        'ratingsList' => $ratingsList
    );

    echo json_encode($output);
}
}
?>