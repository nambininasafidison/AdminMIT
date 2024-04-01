<?php
	$annee = shell_exec("date +%Y");
	$mois = shell_exec("date +%m");

	$annee = trim($annee);
	$mois = trim($mois);

	$nbrJour = 0;
	switch($mois){
		case "01":
			$nbrJour = 31;
			break;
		case "02":
			if (($annee%4 == 0 && $annee%100 != 100) || ($annee%400 == 0))
			{
				$nbrJour = 29;
				break;
			}
			else
			{
				$nbrJour = 28;
				break;
			}
				
		case "03":
			$nbrJour = 31;
			break;
		case "04":
		case "05":
			$nbrJour = 31;
			break;
		case "06":
		case "07":
			$nbrJour = 31;
			break;
		case "08":
			$nbrJour = 31;
			break;
		case "09":
		case "10":
			$nbrJour = 31;
			break;
		case "11":
		case "12":
			$nbrJour = 31;
			break;
	}
	$mysql = mysqli_connect("localhost", "root", "") or die("Tsy mandeha");
	mysqli_select_db($mysql, "mit");
	
	$rt = mysqli_query($mysql,
	"SELECT general  FROM consommation WHERE TimeD LIKE \"$annee-$mois-%\";");
	$res = mysqli_fetch_all($rt);
	
	$rt = mysqli_query($mysql, "SELECT `site1`, `site2`, `site3`, `site4`, `other` FROM `site`
						WHERE timePassed LIKE \"$annee-$mois-%\" AND Levels=\"generale\"");
	$result = mysqli_fetch_all($rt);
	$other = 0;
	foreach($result as $elmt)
	{
		for($i = 0; $i <= 3; $i++)
		{
			$splt = explode("!", $elmt[$i]);
			$data1[$splt[0]] += $splt[1];
		}
		$other += $elmt[4];
	}
	$data1['other'] = $other;

	foreach($res as $elmt)
		foreach($elmt as $e)
			$connexion[] = $e;
			
	for ($i = 1; $i<=$nbrJour; $i++)
	{
		$lbl[] = "$i";
	}
	
	$rt = mysqli_query($mysql, "SELECT timePassed FROM `site`");
	$result = mysqli_fetch_all($rt);

	foreach($result as $elmt)
	{
		foreach($elmt as $e)
		{
			$split = explode('-', $e);
			$tmp34[$split[0]] ++; 
		}
	}
	
	foreach($tmp34 as $key=>$value)
	{
		$year[] = $key;
	}

	$data0['labels'] = $lbl;
	$data0['data'] = $connexion;
	
	$data[] = [$year, $data0, $data1]; 

	$json = json_encode($data);
	header('content-type: application/json');	
	echo $json;
	?>
