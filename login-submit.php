<html>

  <head>
    <title> Log In Page </title>
  </head>

  <body>
    <?php
      $username = $_POST['username'];
      $password = $_POST['password'];
      $file1 = file("users.txt");
      $user_input = '';

      if ($username == ''){
        echo "<script>
              alert('Please type in the Username');
              window.location.replace('./login.php');
              </script>";
      } else if ($password == ''){
        echo "<script>
              alert('Please type in the Password');
              window.location.replace('./login.php');
              </script>";
      } else{
        for ($i = 0; $i < count($file1); $i++){
          $user_input = strstr($file1[$i], $username);
          if($user_input !== false) {
            break;
          }
        }
        if ($user_input == ''){
          echo "<script>
                alert('That Username does not exist. Please try again');
                window.location.replace('./login.php');
                </script>";
        } else{
          $user_inputArr = explode(",", $user_input);
          $input_password = $user_inputArr[1];

          if (strcmp($password, $input_password) !== 0){
            echo strcmp($password, $input_password);
            echo $password;
            echo "<br>";
            echo $input_password;
            echo "<br>";
            echo $username;
            echo "<br>";
            echo $user_input;

          } else{
            echo "<script>
                  alert('Welcome back! Redirecting to gamepage now');
                  window.location.replace('./conwayViaCanvas.html');
                  </script>";
          }
        }
      }
    ?>
  </body>

</html>
