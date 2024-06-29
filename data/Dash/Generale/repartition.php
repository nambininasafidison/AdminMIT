<?php
	$mysql = mysqli_connect("localhost", "root", "") or die("Tsy mandeha");
	mysqli_select_db($mysql, "mit");
	
	$rt = mysqli_query($mysql, "SELECT `applications`, `images`, `videos`, `texts`, `other` FROM `repartitionType` WHERE Levels=\"generale\"");
	
	$result = mysqli_fetch_array($rt);

	$data['applications'] = $result['applications'];
	$data['images'] = $result['images'];
	$data['videos'] = $result['videos'];
	$data['texts'] = $result['texts'];
	$data['other'] = $result['other'];
	

	header('content-type: application/json');
	$json = json_encode($data);

	echo $json;


?>
