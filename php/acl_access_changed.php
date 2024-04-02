<?php 
    function changed_autorise(int $n, array $rules)
    {
        $file = "../conf.d/access.conf";
        file_put_contents($file, "");

        for($i=0;$i<count($rules["access"]);$i++) 
        {
            file_put_contents($file, "http_access " . $rules["access"][$i] . " " . str_replace("+", " ", $rules["name"][$i]) . "\n" , FILE_APPEND);
        }  
    }

    $data = json_decode(file_get_contents('php://input'), true);
    $access = $data['access1'];
    $name = $data['name1'];
    $indice = $data['indice1'];

    $rules = ["access" => $access, "name" => $name];
   
    changed_autorise($indice, $rules);
?>