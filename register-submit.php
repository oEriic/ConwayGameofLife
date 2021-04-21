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
      } else if (is_numeric($password) != 1){
        echo "<script>
              alert('Please only use numbers in the Password');
              window.location.replace('./login.php');
              </script>";
      } else{
        for ($i = 0; $i < count($file1); $i++){
          $user_input = strstr($file1[$i], $username);
          if($user_input !== false) {
            break;
          }
        }
        if ($user_input != ''){
          echo "<script>
                alert('That Username already exists. Please try again');
                window.location.replace('./login.php');
                </script>";
        } else{
          $data = $username.",".$password."\n";
          $file2 = fopen('users.txt', 'a');
          fwrite ($file2, $data);
          fclose ($file2);
          echo "<script>
                alert('Successfully registered! Redirecting to gamepage now');
                window.location.replace('./conway.html');
                </script>";
        }
      }
    ?>
  </body>

</html>
