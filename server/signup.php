<?php  header('content-type: application/json; charset=utf-8');
/**
 * Created by JetBrains PhpStorm.
 * Date: 9/22/12
 * Time: 2:21 PM
 */

include('../../../connect/connect.php');

$con = connectLocal('winebook');
//\$con = connectIpage('winebook');

if ($con) {

    //checking for duplicated username:
    $username_input = $_POST['username'];
    $checkNameQry = "select username from users where username = ?";

     if ($stmt = $con->prepare($checkNameQry)) {
         $stmt->bind_param('s', $username_input);
        if($stmt->execute()){
            /* store result */
            $stmt->store_result();
            if($stmt->num_rows >0){
                echo ('Username already exist');
                $stmt->close();
                $con->close();
                return;
            }
        }
     }
//hash( "sha256" , $_POST['password'])
    //Insert new info into the table
    $insertQry = "INSERT INTO users(username,password) VALUES (?,?)";

    if ($stmt = $con->prepare($insertQry)) {
        $stmt->bind_param('ss', $username_input, hash( "sha256" , $_POST['password']));
        if($stmt->execute()){
            echo('Signup Succeeded');
        }
        else{
            echo('Account Upload Failed');
        }
        $stmt->close();
    }
    $con->close();
}
?>
