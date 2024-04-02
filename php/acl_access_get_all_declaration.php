<?php
    function get_autorise($filename): array
    {
        $lines = array_filter(file($filename));

        foreach($lines as $line)
        {
        $mot = explode(" ", trim($line));
        if(isset($name_access))
        {
            if(!in_array($mot[1], $name_access))
            $name_access[] = $mot[1];    
        }
        else 
        {
            $name_access[] = $mot[1];
        }
        }

        return $name_access;
    }

    $file = ["../conf.d/Domain_name.conf", "../conf.d/Header_name.conf", "../conf.d/HTTP_Method.conf", 
            "../conf.d/HTTP_Status.conf", "../conf.d/Ip.conf", "../conf.d/Mac.conf",
            "../conf.d/Max_connection.conf", "../conf.d/max_user_ip.conf", "../conf.d/Operative_word.conf",
            "../conf.d/Peer_name.conf", "../conf.d/Port.conf", "../conf.d/Processing_step.conf",
            "../conf.d/Protocol.conf", "../conf.d/Server_name.conf", "../conf.d/Snmp_community.conf", 
            "../conf.d/Time.conf", "../conf.d/URL.conf", "../conf.d/Username.conf"  ];

/*    $names[] = get_autorise("../conf.d/Domain_name.conf");
    $names[] = get_autorise("../conf.d/Header_name.conf");
    $names[] = get_autorise("../conf.d/HTTP_Method.conf");
    $names[] = get_autorise("../conf.d/HTTP_Status.conf");
    $names[] = get_autorise("../conf.d/Ip.conf");
    $names[] = get_autorise("../conf.d/Mac.conf");
    $names[] = get_autorise("../conf.d/Max_connection.conf");
    $names[] = get_autorise("../conf.d/max_user_ip.conf");
    $names[] = get_autorise("../conf.d/Operative_word.conf");
    $names[] = get_autorise("../conf.d/Peer_name.conf");
    $names[] = get_autorise("../conf.d/Port.conf");
    $names[] = get_autorise("../conf.d/Processing_step.conf");
    $names[] = get_autorise("../conf.d/Protocol.conf");
    $names[] = get_autorise("../conf.d/Server_name.conf");
    $names[] = get_autorise("../conf.d/Snmp_community.conf");
    $names[] = get_autorise("../conf.d/Time.conf");
    $names[] = get_autorise("../conf.d/URL.conf");
    $names[] = get_autorise("../conf.d/Username.conf");
*/

    foreach($file as $f)
    {
        $name = get_autorise($f);
        foreach($name as $n)
        {   
            $names[] = $n;
        }
    }

    $data = json_encode($names);
    header('Content-Type: application/json');
    echo $data;

?>