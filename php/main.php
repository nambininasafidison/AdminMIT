<?php
    
    function send_data($datas,$i){
        sscanf($datas,"acl %s %s %[^$]",$nom,$type,$val);
        if(($_SESSION["type"]=="Ip")||($_SESSION["type"]=="Domain_name")||($_SESSION["type"]=="Port")){
            $none="- -";
            if(strpos($type,"dst")!==false)
                $todisplay=array($nom,$none,$val);
            else
                $todisplay=array($nom,$val,$none);                            
        }else $todisplay=array($nom,$val);

        return $todisplay;
    }

    function put_datas(){
        $f=fopen($_SESSION["path"],"w");
        if($f){
            foreach($_SESSION["declaration"] as $line){
                fwrite($f,"$line"."\n");
            }
            fclose($f);
        }else{echo json_encode(array("error" => "Impossible d'ouvrir le fichier"));}
    }

    function return_data(){
        $GLOBAL["value"]=array();
        $i=0;
        foreach($_SESSION["declaration"] as $dt){
            $datas=$dt;        
            $GLOBAL["value"][]=send_data($datas,$i);
            $i++;
        }
        return $GLOBAL["value"];
    }

    function nameUnique($data){
        foreach($_SESSION['attribut'] as $key => $value){
            $path="../conf.d/".$key.".conf";
            $decl = file_get_contents($path);
            $declaration=array();
            $declaration= explode("\n",$decl);
    //        $declaration = $_SESSION["declaration"];
            $GLOBAL['line']=0;
            //$line=$declaration[0];
            foreach($declaration as $line){
                sscanf($line,"acl %s %[^$]",$rName,$inutile);
                if($data["name"]==$rName){
                    if(($data['lineM']==$GLOBAL['line'])&&($_SESSION['type']==$key)){
                        continue;
                    }
                    else{
                        return -1;
                    }
                }
                $GLOBAL['line']++;
            }
        }
        return 0;
    }
    
    function write_history($history){
        $connect = mysqli_connect("localhost","root","root")or die("Impossible d'ouvrir le fichier.");
        mysqli_select_db($connect,"mit");
        mysqli_query($connect,"INSERT INTO history_acl (action) VALUES ('$history');");
        mysqli_close($connect);
    }

?>