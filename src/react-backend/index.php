<?php include 'config.php';
// header("Access-Control-Allow-Origin: *");

$uploader = $_POST['uploader'];
$json = array
(
  "video" => [],
);

$videos = array();
$sql = "SELECT * FROM videos";
$video_result = $conn->query($sql);
if($video_result){
    while($row = mysqli_fetch_array($video_result, MYSQL_ASSOC))
    {   
        $videos[]=$row;
    } 
    $json['video']=$videos;
}else {
    echo "fail";
}
      

echo json_encode($json);