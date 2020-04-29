<?php include 'config.php';

$username = $_POST['username'];

$json = array
(
  "userbio" => []
);



$bios = array();
$sql = "SELECT bio FROM userpool WHERE username = '$username'";
$bio_result = $conn->query($sql);
if($bio_result){
    while($row = mysqli_fetch_array($bio_result, MYSQL_ASSOC))
    {   
        $bios[]=$row;
    } 
    $json['userbio']=$bios;
}else{
    echo 'fail';
}


echo json_encode($json);
