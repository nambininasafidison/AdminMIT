<?php
    session_start();
    include 'main.php';
    $postdata = file_get_contents("php://input");
    if(isset($postdata) && !empty($postdata)){
        header('Content-Type: application/json');
        $data=json_decode($postdata,true);
        modify($data);

        $GLOBAL["value"]=return_data();
        echo json_encode($GLOBAL["value"]);
        exit(0);
    }else{
        http_response_code(400);
        header('Content-Type: application/json');
        $error=["Error" => "Aucune donnee recue"];
        echo json_encode($error);
        exit(0);
    }


function modify($data){
    if(nameUnique($data)==0){    
        $toModify=$_SESSION['declaration'][$data['lineM']];
        $modified="acl ".$data["name"];    

        if(($_SESSION["type"]=="Ip")||($_SESSION["type"]=="Domain_name")||($_SESSION["type"]=="Port")){
            if($data["valueSrc"]=="- -"){
                $modified.=" ".$_SESSION["attribut"][$_SESSION["type"]][1]." ".$data["valueDst"];
            }
            else{
                $modified.=" ".$_SESSION["attribut"][$_SESSION["type"]][0]." ".$data["valueSrc"];
            }
        }

        else if($_SESSION["type"]=="Time"){
            if($data["valueSrc"]!="- -"){
                $time=$data["valueSrc"]." ";
            }
            if($data["valueSrc"]!="- -"){
                $time.=$data["valueDst"];
            }
            $modified.=" ".$_SESSION["attribut"][$_SESSION["type"]]." ".$time;
            }
            else{
                if($_SESSION["type"]=="File"){
                    $data["value"]=$data["value"];
                }
                $modified.=" ".$_SESSION["attribut"][$_SESSION["type"]]." ".$data["value"];
            }
            $_SESSION["declaration"][$data['lineM']]=$modified;
            $_SESSION["declaration"]=array_values($_SESSION["declaration"]);
            write_history("This declaration \"$toModify\" is modified to \"$modified\"");
            put_datas();
        }
        else {echo json_encode(["Error" => "Tous les noms doivent etre unique"]);exit(0);}    
    }
?>

