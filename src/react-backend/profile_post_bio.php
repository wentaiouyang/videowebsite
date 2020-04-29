<?php include 'config.php';

$username = $_POST['username'];
$bio = $_POST['newBio'];

$query = "UPDATE userpool SET bio = '$bio' WHERE username = '$username'";
if (mysqli_query($conn,$query)) {
    echo 'success';
}else{
    echo 'fail';
}


