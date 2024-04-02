<?php 
    function saved_autorise(array $check, array $rules)
    {
        $file = "../conf.d/access.conf";

        file_put_contents($file, "");

        for($i=0;$i<count($rules["access"]);$i++) 
        {
            if($check[$i])
                file_put_contents($file, "http_access " . $rules["access"][$i] . " " . str_replace("+", " ", $rules["name"][$i]) . "\n" , FILE_APPEND);
        }  
    }

    $data = json_decode(file_get_contents('php://input'), true);
    $access = $data['access1'];
    $name = $data['name1'];
    $check = $data['check1'];
    
    var_dump($data);

    $rules = ["access" => $access, "name" => $name];
    saved_autorise($check, $rules);
?>