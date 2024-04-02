<?php
    $mysql = mysqli_connect("localhost", "root", "") or die("Tsy mandeha");
	mysqli_select_db($mysql, "mit");
    
    $date = "2024-03-14";

    $rt = mysqli_query($mysql, "SELECT url1, url2, url3, nbr FROM l3 WHERE timePassed=\"$date\"");
    $result = mysqli_fetch_array($rt);

    $get_nbr = explode("#", $result["nbr"]);

    for ($i=0; $i < 3; $i++)
    {
        $site_number[$result["url".$i+1]] = $get_nbr[$i];        
    }

    header("content-type: application/json");

    $jsonL3 = json_encode($site_number);

    echo $jsonL3;

    mysqli_close();
?>