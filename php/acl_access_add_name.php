<?php
    $data = json_decode(file_get_contents('php://input'), true);
    $filename = "../conf.d/access_disable.conf";
    // var_dump($data);

    $name = implode(" ", $data['name']);
    $access = $data['autorisation'];

    file_put_contents($filename, "http_access " . $access . " " . $name . "\n" , FILE_APPEND);
?>