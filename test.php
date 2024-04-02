<?php
  $num_port = $_POST['port'];                     // Définit le port TCP sur lequel Squid écoute les requêtes HTTP.
  $type_stockage = $_POST['contact'];             // type de stockage de cache
  $format_log = $_POST['log'];                    // Définit le format des fichiers journaux de Squid.
  $hostname = $_POST['hote'];                     // Définit le nom d'hôte que Squid affiche aux clients.
  $taille_cache = $_POST['taille'];               // la taille maximale des objets que Squid peut mettre en cache.
  // $min_time = $_POST['min_time'];                 // Définit le temps minimum pendant lequel Squid conserve un objet en cache, même si l'objet n'est pas utilisé.
  // $max_time = $_POST['max_time'];                 // Définit le temps maximum pendant lequel Squid conserve un objet en cache, même si l'objet est utilisé.
  $url_never_cache = $_POST['url_never'];         // Définit une liste d'URL que Squid ne doit jamais mettre en cache.
  $url_download = $_POST['url_download'];         // Définit une liste d'URL que Squid doit toujours télécharger directement, sans les mettre en cache.
  $body_size = $_POST['body_size'];
  $listen_ftp_ports = $listen_ftp_ports = isset($_POST['listen_ftp_ports']) ? $_POST['listen_ftp_ports'] : null;
  /// Stockage : file system

  if ($listen_ftp_ports == "yes") {
    $cmd = "sudo sed -i '/ftp_port/d' /etc/squid/squid.conf";
    exec($cmd , $array , $return);

    $cmd = "sudo sed -i '1i\ ftp_port 21' /etc/squid/squid.conf";

    exec($cmd , $array , $return);
    echo "<p>listen_ftp_ports = $return</p>";


}


  if(isset($type_stockage) && $type_stockage == 1){
    $taille_directory = $_POST['stck'];
    $swap = $_POST['rep'];
    $sous_rep = $_POST['srep'];
    $file_number = $_POST['file'];
    if(isset($taille_directory) && isset($swap) && isset($sous_rep) && isset($file_number)){
      $cmd = "sudo sed -i '/cache_dir/d' /etc/squid/squid.conf";
      exec($cmd , $array , $return);
      echo "<p>cache_dir = $return</p>";

      $cmd = "sudo sed -i '/cache_mem/d' /etc/squid/squid.conf";
      exec($cmd , $array , $return);
      echo "<p>cache_dir = $return</p>";

      $cmd = "sudo sed -i '1i\ cache_dir ufs $swap $taille_directory $sous_rep $file_number' /etc/squid/squid.conf";      
      //$cmd = "sudo echo 'cache_dir ufs $swap $taille_directory $sous_rep $file_number' >> /etc/squid/squid.conf";
      exec($cmd , $array , $return);
      echo "<p>sous rep = $return</p>";

    }
    
  }

  /// Stockage : memory

  else if(isset($type_stockage) && $type_stockage = 2){
    $taille_directory = $_POST['stck'];
    $cmd = "sudo sed -i '/cache_dir/d' /etc/squid/squid.conf";
    exec($cmd , $array , $return);
    exec(makeCmd("cache_mem" , $taille_directory) , $array , $return);
    echo "<p>cache_dir = $return</p>";
  }

  $array = array(); 
  

  // exec("sudo cat /etc/squid/squid.conf|grep -v '^#' | grep [a-zA-Z0-9] > /home/fifaliantsoa/squid.conf" , $arrray , $return );
  // exec("sudo mv /home/fifaliantsoa/squid.conf /etc/squid/squid.conf" , $array , $return);
  echo "<p>ici 1 : $body_size</p>";
  exec("sudo ls", $array , $return);
  echo "<p>test = $return</p>";


  if(isset($body_size) && strcmp($body_size,"")) {
    exec(makeCmd("reply_body_max_size" , $body_size ." MB") , $array , $return);
    echo "<p>reply = $return</p>";
  }

  


  if(isset($num_port) && strcmp($num_port,"")) exec(makeCmd("http_port" , $num_port) , $array , $return);
  echo "<p>cache_dir = $return</p>";

  if(isset($taille_cache) && strcmp($taille_cache,"")) exec(makeCmd("	maximum_object_size_in_memory" , $taille_cache) , $array , $return);
  echo "<p>cache_dir = $return</p>";

  // if(isset($min_time) && strcmp($min_time,"")) exec(makeCmd("minimum_expiry_time" , $min_time) , $array , $return);
  // echo "<p>cache_dir = $return</p>";

  // if(isset($max_time) && strcmp($max_time,"")) exec(makeCmd("maximum_expiry_time" , $max_time) , $array , $return);
  // echo "<p>cache_dir = $return</p>";

  if(isset($url_download) && strcmp($url_download,"")) exec(makeCmd("always_direct" , $url_download) , $array , $return);
  echo "<p>cache_dir = $return</p>";

  if(isset($hostname) && strcmp($hostname,"")) exec(makeCmd("visible_hostname" , $hostname) , $array , $return);
  echo "<p>cache_dir = $return</p>";

  if(isset($format_log) && strcmp($format_log,"")) exec(makeCmd("logformat" , $format_log) , $array , $return);


  
  //shell_exec("sudo systemctl restart squid");
  exec("sudo systemctl restart squid" , $array , $return);
  echo "<p>squid = $return</p>";

  function makeCmd($parametre , $valeur){
      $cmd = "sudo sed -i '/$parametre/d' /etc/squid/squid.conf";
      exec($cmd , $array , $return);

      $cmd = "sudo sed -i '1i\ $parametre $valeur' /etc/squid/squid.conf";

      return $cmd; 
  }

 header("location:http://www.test.com");
?>