<?php include 'config.php';
$username = $_POST['username'];
$password = $_POST['password'];
$query = "INSERT INTO userpool (username,password) VALUES('$username','$password')";

if($username&&$password){
    if(mysqli_query($conn,$query)){
        echo 'success';
    }else{
        echo 'fail';
    }
}
