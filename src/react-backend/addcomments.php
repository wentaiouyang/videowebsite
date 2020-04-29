<?php include 'config.php';

$user = $_POST['user'];
$content = $_POST['content'];
$videoid = $_POST['videoid'];
$query = "INSERT INTO comments (username,comment, videoid) VALUES('$user','$content','$videoid')";
if($user&&$content){
    if(mysqli_query($conn,$query)){
        echo 'success';
    }else{
        echo 'fail';
    }
}