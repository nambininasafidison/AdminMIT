<?php
    session_start();
    include 'main.php';

    $postdata=file_get_contents("php://input");
    if(isset($postdata) && !empty($postdata)){
        $data=json_decode($postdata,true);
        $GLOBAL["value"]=array();
        $GLOBAL["value"]=return_history($data);
        header('Content-Type: application/json');    
        echo json_encode($GLOBAL["value"]);
    }
    else{
        http_response_code(400);
        header('Content-Type: application/json');
        echo json_encode(["Error" => "Aucune donnee recue."]);
    }

    
function return_history($requete){
    $list=array();
    $connect = mysqli_connect("localhost","root","root")or die("Impossible d'ouvrir le fichier.");
    mysqli_select_db($connect,"mit");
    $result=mysqli_query($connect,$requete);
    foreach($result as $r){
        $list[]=array($r['date'],$r['action']);
    }
    mysqli_close($connect);
    return $list;
}
    

<<<<<<< HEAD
?>
=======
?>
>>>>>>> 9be874fe8af66702d99c14a05e3034208c20f695
