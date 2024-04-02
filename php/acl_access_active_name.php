<?php 
    function active_name(int $n,array $rules): void 
    {
        $file_active = "../conf.d/access.conf";
        $file_disable = "../conf.d/access_disable.conf";
        file_put_contents($file_disable, "");
        
        for($i=0;$i<count($rules["access"]);$i++) 
        {
        if($n !== $i)
            file_put_contents($file_disable, "http_access " . $rules["access"][$i] . " " . str_replace("+", " ", $rules["name"][$i]) . "\n" , FILE_APPEND);
        else 
            file_put_contents($file_active, "http_access " . $rules["access"][$i] . " " . str_replace("+", " ", $rules["name"][$i]) . "\n" , FILE_APPEND);
        }
    }

    $data = json_decode(file_get_contents('php://input'), true);
    $access = $data['access1'];
    $name = $data['name1'];
    $indice = $data['indice1'];

    $rules = ["access" => $access, "name" => $name];
    active_name($indice, $rules);
?>