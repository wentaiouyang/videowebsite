<?php include 'config.php';
$videoid = $_POST['videoid'];

$json = array
(
  "comments" => [],
);

$comments = array();
$sql = "SELECT * FROM comments WHERE videoid = '$videoid'";
$comment_result = $conn->query($sql);
if($comment_result){
    while($row = mysqli_fetch_array($comment_result, MYSQL_ASSOC))
    {   
        $comments[]=$row;
    } 
    $json['comments']=$comments;
}else {
    echo "fail";
}
      

echo json_encode($json);
