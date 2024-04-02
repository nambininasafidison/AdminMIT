<?php
    include('function.php');
    $mysql = mysqli_connect("localhost", "root", "") or die("Tsy mandeha");
    mysqli_select_db($mysql, "mit");
	
    $today = shell_exec("date +'%04Y-%m-%d'");

    mysqli_query($mysql, "CREATE TABLE IF NOT EXISTS generale(TimePassed date NOT NULL, url1 text, url2 text, url3 text, nbr VARCHAR(255));");
    mysqli_query($mysql, "CREATE TABLE IF NOT EXISTS respo(TimePassed date NOT NULL, url1 text, url2 text, url3 text, nbr VARCHAR(255));");
    mysqli_query($mysql, "CREATE TABLE IF NOT EXISTS l1(TimePassed date NOT NULL, url1 text, url2 text, url3 text, nbr VARCHAR(255));");
    mysqli_query($mysql, "CREATE TABLE IF NOT EXISTS l2(TimePassed date NOT NULL, url1 text, url2 text, url3 text, nbr VARCHAR(255));");
    mysqli_query($mysql, "CREATE TABLE IF NOT EXISTS l3(TimePassed date NOT NULL, url1 text, url2 text, url3 text, nbr VARCHAR(255));");
    mysqli_query($mysql, "CREATE TABLE IF NOT EXISTS m1(TimePassed date NOT NULL, url1 text, url2 text, url3 text, nbr VARCHAR(255));");
    mysqli_query($mysql, "CREATE TABLE IF NOT EXISTS m2(TimePassed date NOT NULL, url1 text, url2 text, url3 text, nbr VARCHAR(255));");
    mysqli_query($mysql, "CREATE TABLE IF NOT EXISTS consommation(TimeD DATE NOT NULL UNIQUE, L1 INTEGER, L2 INTEGER, L3 INTEGER, M1 INTEGER, M2 INTEGER, respo INTEGER, general INTEGER);");
    mysqli_query($mysql, "CREATE TABLE IF NOT EXISTS repartitionType(Levels VARCHAR(255) NOT NULL UNIQUE, applications INTEGER, images INTEGER, videos INTEGER, texts INTEGER, other INTEGER);");
    mysqli_query($mysql, "CREATE TABLE IF NOT EXISTS site(TimePassed date NOT NULL, Levels VARCHAR(255) NOT NULL, site1 text, site2 text, site3 text, site4 text, other INTEGER);");

    $file = file("log.txt");
    foreach($file as $elmt)
    {
        sscanf($elmt, "%s %d %s %*s %d %*s %s %*s %*s %s", $date, $timePassed, $ip, $size, $url, $type);
        $getType = explode("/", $type);
        $date = to_date($date);
        // if ($date == $today)
        // {
            $url = transform_url($url);
            if ($url != "error")
            {
                if (strlen($url) != 0)
                {
                    $flags = verif_ip($ip);

                    if ($flags == "resp")
                    {
                        $sizeRespo[] = $size;
                        $visitedSite_respo[$url] ++;
                        $typeRespo[$getType[0]] += $size;
                        $siteRespo[$url] += $size;
                    }
                    if ($flags == "l1")
                    {
                        $sizel1[] = $size;
                        $visitedSite_l1[$url] ++;
                        $typeL1[$getType[0]] += $size;
                        $siteL1[$url] += $size;
                    }
                    if ($flags == "l2")
                    {
                        $sizel2[] = $size;
                        $visitedSite_l2[$url] ++;
                        $typeL2[$getType[0]] += $size;
                        $siteL2[$url] += $size;
                    }
                    if ($flags == "l3")
                    {
                        $sizel3[] = $size;
                        $visitedSite_l3[$url] ++;
                        $typeL3[$getType[0]] += $size;
                        $siteL3[$url] += $size;
                    }
                    if ($flags == "m1")
                    {
                        $sizem1[] = $size;
                        $visitedSite_m1[$url] ++;
                        $typeM1[$getType[0]] += $size;
                        $siteM1[$url] += $size;
                    }
                    if ($flags == "m2")
                    {
                        $sizem2[] = $size;
                        $visitedSite_m2[$url]++;
                        $typeM2[$getType[0]] += $size;
                        $siteM2[$url] += $size;
                    }
                    $visitedSiteGeneral[$url] ++;
                    $typeGeneral[$getType[0]] += $size;
                    $siteGeneral[$url] += $size;
                }
                
            // }
            $sizeTotal[] = $size;
        }        
    }
	
	

	enterSite($mysql, $siteGeneral, $date, "generale");
	enterSite($mysql, $siteL1, $date, "l1");
	enterSite($mysql, $siteL2, $date, "L2");
	enterSite($mysql, $siteL3, $date, "l3");
	enterSite($mysql, $siteM1, $date, "m1");
	enterSite($mysql, $siteM2, $date, "m2");
	enterSite($mysql, $siteRespo, $date, "respo");

    repartition($mysql, $typeGeneral, "generale");
    repartition($mysql, $typeL1, "l1");
    repartition($mysql, $typeL2, "l2");
    repartition($mysql, $typeL3, "l3");
    repartition($mysql, $typeM1, "m1");
    repartition($mysql, $typeM2, "m2");
    repartition($mysql, $typeRespo, "respo");
    


    enterData($mysql, "generale", $date, $visitedSiteGeneral);
    enterData($mysql, "respo", $date, $visitedSite_respo);
    enterData($mysql, "l1", $date, $visitedSite_l1);
    enterData($mysql, "l2", $date, $visitedSite_l2);
    enterData($mysql, "l3", $date, $visitedSite_l3);
    enterData($mysql, "m1", $date, $visitedSite_m1);
    enterData($mysql, "m2", $date, $visitedSite_m2);

		

    $totalSizeL1 = total_connexion($sizel1);
    $totalSizeL2 = total_connexion($sizel2);
    $totalSizeL3 = total_connexion($sizel3);
    $totalSizeM1 = total_connexion($sizem1);
    $totalSizeM2 = total_connexion($sizem2);
    $totalSizeRespo = total_connexion($sizeRespo);
    $totalSizeGeneral = total_connexion($sizeTotal);

    $verify = mysqli_query($mysql, "SELECT * FROM consommation WHERE TimeD=\"$date\";");
    $flags = mysqli_num_rows($verify);


    if ($flags == 0)
    {
        mysqli_query($mysql,
        "INSERT INTO consommation(TimeD, L1, L2, L3, M1, M2, respo, general) VALUES(\"$date\", \"$totalSizeL1\", \"$totalSizeL2\", \"$totalSizeL3\", \"$totalSizeM1\" ,\"$totalSizeM2\", \"$totalSizeRespo\", \"$totalSizeGeneral\");");
    }
    else
    {
        mysqli_query($mysql,
        "DELETE FROM consommation WHERE timeD=\"$date\";");
        mysqli_query($mysql,
        "INSERT INTO consommation(TimeD, L1, L2, L3, M1, M2, respo, general) VALUES(\"$date\", \"$totalSizeL1\", \"$totalSizeL2\", \"$totalSizeL3\", \"$totalSizeM1\" ,\"$totalSizeM2\", \"$totalSizeRespo\", \"$totalSizeGeneral\");");
    }
    echo "mety";

    mysqli_close();

?>
