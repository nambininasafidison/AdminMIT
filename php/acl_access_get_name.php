<?php 
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

    function get_disable(): array
    {
      $lines = array_filter(file("../conf.d/access_disable.conf"));
      
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
    
    $data[] = get_active();
    $data[] = get_disable(); 
    $d = json_encode($data);

    header('Content-Type: application/json');
    echo $d;
?>