<?php
function transform_url($url)
{
    $second = substr($url, 0, 7);
    if ($second[6] == '/')
    {
        $url = str_replace($second, "", $url);
        if ($url[0] == '/')
            $url = str_replace("/", "", $url);
    }

    $index = 0;
    for ($i = 0; $i < strlen($url); $i++)
    {
        if ($url[$i] == '/' or $url[$i] == ':')
        {
            $index = $i;
            break;
        }
    }
    
    $result = "";

    for ($i=0; $i < $index; $i++) { 
        $result[$i] = $url[$i];
    }
    return $result;
}

function total_connexion($kb)
{
    $somme = 0;
    for ($i = 0; $i < count($kb); $i++)
        $somme += $i;
    return $somme;
}

function to_date($time)
{
    $commande = "date --date=@$time +'%+4Y-%m-%d'";
    $var = trim(shell_exec($commande));
    return $var;
}

function verif_ip($ip)
{
    $split = explode(".", $ip);
    if ($split[2] == 4)
    {

        if ($split[3] > 1 && $split[3] < 31)
        {
            return "resp";
        }
        if ($split[3] >= 32 && $split[3] < 132)
        {
            return "l1";
        }
        if ($split[3] > 132 && $split[3] < 233)
        {
            return "l2";
        }
        if ($split[3] > 233)
        {
            return "l3";
        }
    }
    if ($split[2] == 5)
    {
        if ($split[3] > 1 && $split[3] < 77)
        {
            return "l3";
        }
        if ($split[3] > 78 && $split[3] < 178)
        {
            return "m1";
        }
        if ($split[3] > 179)
        {
            return "m2";
        }
    }
    if ($split[2] == 6)
    {
        if ($split[3] > 1 && $split[3] < 43)
        {
            return "m2";
        }
    }
}

function getMax($tabSpe) : array{
    $tmp = $tabSpe;
    $result = [];
    sort($tmp);

    foreach($tabSpe as $key => $value)
    {
        for ($i = count($tmp) - 1; $i > count($tmp) - 4; $i--)
        {
            if ($value == $tmp[$i]){
                $result[$key] = $value;
            }
        }
        if (count($result) == 3)
        {
            break;
        }
    }

    return $result;
}

function getMax1($tabSpe) : array{
	$other = 0;
    $tmp = $tabSpe;
    $result = [];
    sort($tmp);

    foreach($tabSpe as $key => $value)
    {
        for ($i = count($tmp) - 1; $i > count($tmp) - 5; $i--)
        {
            if ($value == $tmp[$i]){
                $result[$key] = $value;
                unset($key);
            }
        }
        if (count($result) == 4)
        {
            break;
        }
    }
    
    foreach($tabSpe as $elmt)
		$other += $elmt;
    
    $result[0] = $other;

    return $result;
}


function enterData($mysql, $level, $date, $tab)
{
    $result = getMax($tab);
    $values = "";

    foreach($result as $key => $value)
    {
        $nameserver[] = $key;
        $values .= $value.'#';
    }

    // foreach($result as $e){
    //     foreach($e as $key=>$elmt)
    //     {
    //         $nameserver[] = $key;
    //         $values .= $elmt.'#';
    //     }
    // }

    $rt = mysqli_query($mysql, "SELECT * FROM $level WHERE timePassed=\"$date\";");
    $size_of_rt = mysqli_num_rows($rt);

    if ($size_of_rt == 0){
        mysqli_query($mysql,
        "INSERT INTO $level(timePassed, url1, url2, url3, nbr) VALUES(\"$date\", \"$nameserver[0]\", \"$nameserver[1]\", \"$nameserver[2]\", \"$values\");");
    }
    else
    {
        mysqli_query($mysql, "DELETE FROM $level WHERE timePassed=\"$date\";");
        mysqli_query($mysql,
        "INSERT INTO $level(timePassed, url1, url2, url3, nbr) VALUES(\"$date\", \"$nameserver[0]\", \"$nameserver[1]\", \"$nameserver[2]\", \"$values\");");
    }  
}


function repartition($mysql, $var, $level)
{

    if (is_null($var['video']))    $video = 0;
    
    else    $video = $var['video'];
    
    if (is_null($var['image']))    $image = 0;

    else $image = $var['image'];   
    
    if (is_null($var['application']))   $application = 0;

    else $application = $var['application'];

    if (is_null($var['text']))    $text = 0;

    else    $text = $var['text'];

    if (is_null($var['-']))        $other = 0;
    else    $other = $var['-'];
    
    
    $rt = mysqli_query($mysql,
        "SELECT * FROM repartitionType WHERE Levels=\"$level\";"
    );
    
    $result = mysqli_num_rows($rt);

    if ($result == 0)
    {
        mysqli_query($mysql,
        "INSERT INTO `repartitionType`(`Levels`, `applications`, `images`, `videos`, `texts`, `other`) VALUES(\"$level\", $application, $image, $video, $text, $other);");
    }
    else{
        mysqli_query($mysql,
        "DELETE FROM repartitionType WHERE Levels=\"$level\";"
        );

        echo "DELETE FROM repartitionType WHERE Levels=\"$level\";<br>";

        mysqli_query($mysql,
        "INSERT INTO `repartitionType`(`Levels`, `applications`, `images`, `videos`, `texts`, `other`) VALUES(\"$level\", $application, $image, $video, $text, $other);");
    }
     
}

function enterSite($mysql, $var, $date, $level)
{
	$result = getMax1($var);
	$other = $result[0];
	unset($result[0]);
	$values = "";

    foreach($result as $key => $value)
    {
        $nameserver[] = $key.'!'.$value;
    }
    $rt = mysqli_query($mysql, "SELECT * FROM site WHERE timePassed=\"$date\" AND Levels=\"$level\";");
    $size_of_rt = mysqli_num_rows($rt);

    if ($size_of_rt == 0){
        mysqli_query($mysql,
        "INSERT INTO `site`(`TimePassed`, `Levels`, `site1`, `site2`, `site3`, `site4`, `other`)
         VALUES(\"$date\", \"$level\", \"$nameserver[0]\", \"$nameserver[1]\", \"$nameserver[2]\", \"$nameserver[3]\", \"$other\");");
    }
    else
    {
        mysqli_query($mysql, "DELETE FROM site WHERE timePassed=\"$date\" AND Levels=\"$level\";");
         mysqli_query($mysql,
        "INSERT INTO `site`(`TimePassed`, `Levels`, `site1`, `site2`, `site3`, `site4`, `other`)
         VALUES(\"$date\", \"$level\", \"$nameserver[0]\", \"$nameserver[1]\", \"$nameserver[2]\", \"$nameserver[3]\", \"$other\");");
        echo "DELETE FROM site WHERE timePassed=\"$date\" AND Levels=\"$level\";<br>";
    } 
    
}
?>
