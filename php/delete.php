<?php
    session_start();
    include 'main.php';

    $data = file_get_contents("php://input");
    $GLOBAL['value']=array();
    if(isset($data) && !empty($data)){
        header('Content-Type: application/json');
        $postdata = json_decode($data, true);
        suppr_line($postdata["lineD"]);
        put_datas();

        $GLOBAL["value"]=return_data();
        echo json_encode($GLOBAL["value"]);
    
    } else {
        http_response_code(400);
        header('Content-Type: application/json');
        echo json_encode(array("error" => "Aucune donnee recue"));
    }

function suppr_line($dt){
    $_GET["lineD"] = $dt;

    $GLOBAL['line']="";

    $GLOBAL['line']=$_SESSION['declaration'][$_GET['lineD']];
    unset($_SESSION['declaration'][$_GET['lineD']]);
    $_SESSION['declaration']=array_values($_SESSION['declaration']);

//Delet access which depends on this acl
    // $dt=file_get_contents('/etc/squid/conf.d/access.conf');
    $dt=$_SESSION['access'];
    sscanf($GLOBAL['line'],"%s %s %[^$]",$acl,$name,$inutile);
    // $f = fopen("/etc/squid/conf.d/access.conf","w");
    $f = fopen("../conf.d/access.conf","w");
    if($f){
        foreach($dt as $d){
            $pos = strpos($d," ".$name." ");
            if($pos==false){
                fwrite($f,$d."\n");
            }
        }
//        write_history("This declaration is supprimed: \"{$GLOBAL['line']}\"(with all access which depend on it).");
    }else echo json_encode(array("message"=>"Impossible d'ouvrir le fichier."));
    fclose($f);
}
?>
