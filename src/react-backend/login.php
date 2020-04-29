<?php include 'config.php';

include 'seesion_config.php';

$username = $_POST['username'];
$password = $_POST['password'];
$status = $_POST['status'];


$query = "SELECT * FROM userpool WHERE (username = '$username') AND (password = '$password')";
$result = $conn->query($query);
if ($result->num_rows==0){
    echo json_encode('vertify failed');
}
else {
    // echo json_encode('ok');
    session_start();
    $_SESSION['admin']=true;
}

if (isset($_SESSION['admin']) && $_SESSION['admin']===true){
    echo json_encode('ok');
}else {
    $_SESSION['admin']=false;
}