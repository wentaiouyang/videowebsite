<?php include 'config.php';

$title = $_POST['title'];
$video_upload = $_POST['video_upload'];
$description = $_POST['description'];

$query = "INSERT INTO videos (title,url,description) VALUES('$title','$video_upload','$description')";
if(mysqli_query($conn,$query)){
    echo 'success';
}else{
    echo 'fail';
}