<?php header('content-type: application/json; charset=utf-8');
/**
 * Created by JetBrains PhpStorm.
 * Date: 4/16/13
 * Time: 10:23 PM
  */

include('../../../connect/connect.php');


$con = connectLocal('winebook');
//$con = connectIpage('winebook');
if ($con) {
        //checking for valid password:
        $username_input = $_POST['username'];
        //$username_input = 'huy';
        $pass_input     = hash('sha256',$_POST['password']);
        //$pass_input     = hash('sha256','1234567');
        $qry = "select password from users where username = ?";
        if($result = $con->prepare($qry)){
            $result->bind_param('s',$username_input);
            if($result->execute()){
                $db_password = 0;
                $result->store_result();
                if($result->num_rows >0){
                    $result->bind_result($pass);
                    while ($result->fetch()) {
                        $db_password = $pass;
                    }
                    if($pass_input == $db_password){
                        echo ('Login Succeeded');
                    }
                    else{
                        echo('Invalid Password');
                    }

                }
                else{
                    echo('Invalid UserName');
                }
            }
            $result->close();
        }
$con->close();
}
?>
