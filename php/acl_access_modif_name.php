<?php
    $data = json_decode(file_get_contents('php://input'), true);
    $filename = "../conf.d/access.conf";

    $name = $data['name'];
    $ligne = $data['indice'];

    function get_active(): array
    {
      $lines = array_filter(file("../conf.d/access.conf"));
      
      foreach ($lines as $key => $line) 
      {
        $mot = explode(" ", trim($line));
  
        $access[$key] = $mot[1];
        
        if(count($mot) > 3)
        {
          $name[] = $mot[2];
          for($i=3;$i<count($mot);$i++)
          {
            $name[$key] = $name[$key] . "+" . $mot[$i];
          }
        }
        else 
        {
          $name[] = $mot[2];
        }
      }

      $rules[0] = $access;
      $rules[1] = $name;
      return $rules;
    }
    function writte_autorise($name, $ligne, array $rules)
    {
        $file = "../conf.d/access.conf";

        file_put_contents($file, "");

        for($i=0;$i<count($rules[0]);$i++) 
        {
            if($ligne === $i)
            {
                file_put_contents($file, "http_access " . $rules[0][$i] . " " . implode(" ", $name) . "\n" , FILE_APPEND);
                echo "http_access " . $rules[0][$i] . " " . implode(" ", $name) . "\n";
            }
            else
            {
                file_put_contents($file, "http_access " . $rules[0][$i] . " " . str_replace("+", " ", $rules[1][$i]) . "\n" , FILE_APPEND);
                echo "http_access " . $rules[0][$i] . " " . str_replace("+", " ", $rules[1][$i]) . "\n";
            }
        }  
    }

    $names = get_active();
    // var_dump($ligne);
    writte_autorise($name, $ligne, $names);
?>