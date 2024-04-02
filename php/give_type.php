<?php
    session_start();

    $data = file_get_contents("php://input");
    if(isset($data) && !empty($data)){
        header('Content-Type: application/json');
        $postdata = json_decode($data, true);
        echo json_encode($_SESSION["type"]);
    
    } else {
        http_response_code(400);
        header('Content-Type: application/json');
        echo json_encode(array("error" => "Aucune donnee recue"));
    }
?>