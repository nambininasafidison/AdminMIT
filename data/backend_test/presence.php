<?php
                                                                                                                                                                                                                      
    $data = new stdClass();
    $data->presence = new stdClass();
    $data->presence->count = 1;
    $data->presence->link = "http://localhost/Dashboard/test.html";
    
    $data->pc_non_pris = new stdClass();
    $data->pc_non_pris->count = 12;
    $data->pc_non_pris->link = "http://localhost/Dashboard/test.html";
    

    $data->pc_non_remis = new stdClass();
    $data->pc_non_remis->count = 9;
    $data->pc_non_remis->link = "http://localhost/Dashboard/test.html";

    $json = json_encode(array($data));
    
    header('Content-Type: application/json');

    echo $json;
    
?>  