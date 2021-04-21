<html>

  <head>
    <title> Log In Page </title>
  </head>

  <body>
    <?php
      $username = $_POST['username'];
      $password = $_POST['password'];
      $file1 = file("users.txt");
      $user_saved = '';

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
          $user_saved = strstr($file1[$i], $username);
          if($user_saved !== false) {
            break;
          }
        }
        if ($user_saved == ''){
          echo "<script>
                alert('That Username does not exist. Please try again');
                window.location.replace('./login.php');
                </script>";
        } else{
          $user_savedArr = explode(",", $user_saved);
          $saved_password = $user_savedArr[1];
          
          if ($password != $saved_password){
            echo "<script>
                  alert('That Password does not match with the Username. Please try again');
                  window.location.replace('./login.php');
                  </script>";
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
