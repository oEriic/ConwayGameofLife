<html>
  <head>
    <title> Log In Page </title>
    <link rel = "stylesheet" href = "css.css">

  </head>

  <body>
    <h1> Game of Life </h1>

    <div class = "container">
      <div class = "login">
        <form action = "login-submit.php" method = "post">
          <fieldset style = "margin-bottom: 10px">
            <legend> Log In </legend>
            <ul>
              <li>
                <div id = "user"> </div>
                Username <br>
                <input class = "inputBox" type = "text" name = "username" placeholder = "Username">
              </li>
              <br>
              <li>
                Password <br>
                <input class = "inputBox" type = "text" name = "password" placeholder = "Password">
              </li>
              <br>
              <input class = "submitButton" type = "submit" value = "Log In">
            </ul>
          </fieldset>
        </form>
      </div>

      <div class = "register">
        <form action = "register-submit.php" method = "post">
          <fieldset style = "margin-bottom: 10px">
            <legend> Register </legend>
            <ul>
              <li>
                Username <br>
                <input class = "inputBox" type = "text" name = "username" placeholder = "Username">
              </li>
              <br>
              <li>
                Password <br>
                <input class = "inputBox" type = "text" name = "password" placeholder = "Password">
              </li>
              <br>
              <input class = "submitButton" type = "submit" value = "Register">
            </ul>
          </fieldset>
        </form>
      </div>
    </div>

  </body>

</html>
