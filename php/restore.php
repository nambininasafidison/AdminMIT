<?php
    session_start();
    include 'main.php';
    restore();
    put_datas();

    $GLOBAL["value"]=return_data();
    echo json_encode($GLOBAL["value"]);
    
function restore(){
    $_SESSION["declaration"]=$_SESSION["sauvegarde"];
    $_SESSION['declaration']=array_values($_SESSION['declaration']);    

    $f=fopen("../conf.d/access.conf","w");
    if($f){
        foreach($_SESSION["access"] as $line){
            fwrite($f,"$line"."\n");
        }
        fclose($f);
    }     

    write_history("All modification in this type is restored.");
}

?>