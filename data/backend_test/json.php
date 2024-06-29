<?php
    $site1 = new stdClass();
    $site1->domain = "www.chatopenai.com";
    $site1->number = rand(30 , 300);
    
    $site2 = new stdClass();
    $site2->domain = "www.google.com";
    $site2->number = rand(30 , 300);
    
    $site3 = new stdClass();
    $site3->domain = "www.youtube.com";
    $site3->number = rand(30 , 300);
    
    $data = array($site1 , $site2 , $site3);

    $json = json_encode($data);
    
    header('Content-Type: application/json');
    
    echo $json;

?>