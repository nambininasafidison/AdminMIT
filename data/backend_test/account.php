<?php
    $user = new stdClass(); 
    $user->name = "rakoto";
    $user->firstName = "rabe";
    $user->level = "L1";
    $user->type = "ADMIN";
    $user->date = "26/03/2023 10:03";

    $json = json_encode(array($user));

    echo $json;
?>