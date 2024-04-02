<?php
    session_start();
    include 'main.php';

    $postdata = file_get_contents("php://input");
    if(isset($postdata)&& !empty($postdata)){
        $data = json_decode($postdata,true);
        add($data);
        $GLOBAL["value"]=return_data();
        header("Content-type: application/json");
        echo json_encode($GLOBAL["value"]);
    }
    else{
        http_response_code(400);
        header('Content-type: application');
        echo json_encode(["Error" => "Aucune donnee recue."]);
    }


function add($data){    
    if(nameUnique($data)==0){
        if(($_SESSION["type"]=="Domain_name")||($_SESSION["type"]=="Port")||($_SESSION["type"]=="Ip")){
                if($data['sOd']=="src"){
                    $added="acl ".$data["name"]." ".$_SESSION["attribut"][$_SESSION["type"]][0]." ";                    
                }
                else{
                    $added="acl ".$data["name"]." ".$_SESSION["attribut"][$_SESSION["type"]][1]." ";                                    
                }
        }
        if(($_SESSION["type"]=="Domain_name") || ($_SESSION["type"]=="Port") || ( (isset($data['tp']) && ( ($data['tp']==1) || ($data['tp']==3) ) ) )){
            foreach ($data as $name => $value) {
                if(($name!='name')&&($name!='sOd')&&($name!='tp')){
                    $added.=$value." ";
                }
            }
        }  
        else if( ($_SESSION["type"]=="Ip")&& (isset($data['tp']) && ($data['tp']==2) ) ){
            $i=0;
            foreach ($data as $name => $value) {
                if( ($name!='name')&&($name!='sOd')&&($name!='tp') ){
                    if($i==0)$added.=$value."-";
                    else if($i==1){
                        $added.=$value." ";
                        $i=-1;
                    }
                    $i++;
                }
            }        
        }
        else{

            $added="acl ".$data["name"]." ".$_SESSION["attribut"][$_SESSION["type"]]." ";
            if($_SESSION["type"]=="Time"){
                $added.=$data['D'];
                if(isset($data['toD'])){
                    $added.="-".$data['toD'];
                }
                $added.=" ".$data['H'];
                if(isset($data['H1'])){
                    $added.="-".$data['H1'];
                }
            }
            else{
                foreach ($data as $name => $value) {
                    if($name!='name'){
                        $added.=$value." ";
                    }
                }
            }
        }
        $_SESSION["declaration"][]=$added;
        write_history("This declaration is added: \" $added \"");
        put_datas();
        // $reponse = shell_exec("systemctl restart squid");
        // if($reponse==0){
        //     write_history("This declaration is added: \" $added \"");
        //     put_datas();
        // }
        // else {
        //     $errorMessage = shell_exec('echo $status');
        //     echo json_encode(["Error" => $errorMessage]);
        //     exit(0);
        // }
    }
    else {echo json_encode(["Error" => "The name must be unique. Enter another."]);exit(0);}
}
?>