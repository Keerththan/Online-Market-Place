<?php

header ("Access-Control-Allow-Origin:* ");
header("Allow-Control-Allow-Headers:* ");
header("Allow-Conrol-Allow-Methods");

//Ris/

$servername = "localhost"; 
    $username = "root"; 
    $password = ""; 
    $dbname = "elitez"; 


try {
    $connect = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    exit;
}


