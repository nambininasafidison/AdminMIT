<?php
    $yesterday = date('Y-m-d',time()-24*3600);
    $today = date('Y-m-d');

    $connexion = mysqli_connect("localhost","mit","123456","mit")
    or die("Echec de connexion");

    $list = [];

    /// nombre pc non pris
    $query = "select count(*) from machine_etudiants 
                where id_pc not in 
                    (select id_pc_etudiant from presence_pc_portable 
                        where statut='Retrait' 
                        and date_operation > '{$yesterday}' 
                        and date_operation < '{$today}')";

    $result = mysqli_query($connexion,$query);
    $table = mysqli_fetch_assoc($result);
    $count = $table['count(*)'];
    $list["pc_non_pris"] = ["count" => $count,"link" => "../NotifPC/pc_non_pris.php"];

    /// nombre pc non remis
    $query = "select count(*) from presence_pc_portable as t1 
                where t1.statut = 'Retrait' and not exists 
                    (select id_pc_etudiant from presence_pc_portable as t2
                        where t2.statut = 'Remise'
                        and t2.id_pc_etudiant = t1.id_pc_etudiant
                        and t2.date_operation > t1.date_operation);";

    $result = mysqli_query($connexion,$query);
    $table = mysqli_fetch_assoc($result);
    $count = $table['count(*)'];
    $list["pc_non_remis"] = ["count" => $count,"link" => "../NotifPC/pc_non_remis.php"];

    /// nombre des absents
    $query = "select count(*) from inscription 
                where id_inscription not in 
                    ( select id_etudiant from presence 
                        where statut = 1 
                        and date_presence like '{$yesterday}%')";

    $result = mysqli_query($connexion,$query);
    $table = mysqli_fetch_assoc($result);
    $count = $table['count(*)'];
    $list["presence"] = ["count" => $count,"link" => "../NotifPC/absents.php"];


    mysqli_close($connexion);
    $json = json_encode($list);
    print_r($list);


?>

