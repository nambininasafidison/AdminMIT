<?php 
    function get_autorise(): array
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
    
    $data = json_encode(get_autorise());
    header('Content-Type: application/json');
    echo $data;
?>