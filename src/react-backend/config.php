<?php
header("Access-Control-Allow-Origin: *");
$serverName="localhost";
$userName="root";
$password="root";
$databaseName="wis";

// $serverName="localhost";
// $userName="id10748601_owen";
// $password="XZouyang123++";
// $databaseName="id10748601_wis";
$conn = mysqli_connect($serverName, $userName, $password,$databaseName);
//db connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}