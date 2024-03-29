<?php
    session_start();
    include 'main.php';

    default_data();
    
    get_data();
    $GLOBAL["value"]=array();
    $i=0;
    $GLOBAL["value"]=return_data();
    header('Content-Type: application/json');    
    echo json_encode($GLOBAL["value"]);


function default_data(){    

    if(!isset($_SESSION["type"])){
        $_SESSION["type"]="Ip";
        $_SESSION["path"]="../conf.d/Ip.conf";
//        $_SESSION["path"]="/etc/squid/conf.d/Ip.conf";
    }

    if(!isset($_SESSION["attribut"])){
        $_SESSION["attribut"]=array(
            "Ip" => array("src","dst"),

            "Domain_name" => array("scrdomain","dstdomain"),
            "Port" => array("port","dstPort"),

            "HTTP_Method" => "method",
            "File" => "url_regex -i",
            "HTTP_Status" => "http_status",
            "URL" => "url_regex",
            "Mac" => "arp",
            "Protocol" => "proto",
            "Username" => "ident",
            "Peer_name" => "peername",
            "Operative_word" => "url_regex",
            "Max_connection" => "maxconn",
            "Snmp_community" => "snmp_community",
            "Max_user_ip" => "max_user_ip",
            "Processing_step" => "at_step",
            "Server_name" => "ssl::server_name_regex",
            "Header_name" => "req_header",
            "Authentification" => "proxy_auth",

            "Time" => "time"
        );
    }
    if(!isset($_SESSION['days'])){
        $jours=array(   "M"=>"Monday",
        "T"=>"Tuesday",
        "W"=>"Wednesday",
        "H"=>"Thursday",
        "F"=>"Friday",
        "A"=>"Saturday",
        "S"=>"Sunday"
        );
        $_SESSION['days']=$jours;
    }
}

function get_data(){
//        $path="/etc/squid/conf.d/".$_SESSION["type"].".conf";
        $_SESSION["path"]="../conf.d/".$_SESSION["type"].".conf";
        $datas=file_get_contents($_SESSION["path"]);
        $_SESSION["declaration"]=explode("\n",$datas);
        $_SESSION["sauvegarde"]=$_SESSION["declaration"];
        array_pop($_SESSION["declaration"]);
        array_pop($_SESSION["sauvegarde"]);

        $dt=file_get_contents('../conf.d/access.conf');
        $dt=explode("\n",$dt);
        $_SESSION["access"]=$dt;        

        /*$_SESSION['indice']=array();
        for($i=0;$i<count($_SESSION["declaration"]);$i++){
            $_SESSION['indice'][]=$i;
        }*/
}


<<<<<<< HEAD
?>
=======
?>
>>>>>>> 9be874fe8af66702d99c14a05e3034208c20f695
