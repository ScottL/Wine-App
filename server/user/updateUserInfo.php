<?php
/**
 * Created by JetBrains PhpStorm.
 * Date: 5/22/13
 * Time: 11:41 PM
 * To change this template use File | Settings | File Templates.
 */


include('../../../../connect/connect.php');

//$con = connectIpage('winebook');
$con = connectLocal('winebook');

if ($con){
    $old_username =  $_POST['old_username'];
    $new_username =  $_POST['new_username'];
    $password =  $_POST['password'];

    if($new_username && $password){
        $newPass = hash( "sha256" , $password);
        $query = 'UPDATE users SET username = ?, password=? WHERE username = ?';
        $stmt = $con->prepare($query);
        $stmt->bind_param('sss', $new_username, $newPass, $old_username);
        if($stmt->execute()){}
        else{
            echo 'Update Failed';
            $stmt->close();
            $con->close();
            return;
        }
        
        
        
        $query = 'UPDATE winejournal SET username = ? WHERE username = ?';
        $stmt = $con->prepare($query);
        $stmt->bind_param('ss', $new_username , $old_username);
        if($stmt->execute()){}
        else{
            echo 'Update Failed';
            $stmt->close();
            $con->close();
            return;
        }
        
        $query = 'UPDATE wineryjournal SET username = ? WHERE username = ?';
        $stmt = $con->prepare($query);
        $stmt->bind_param('ss', $new_username , $old_username);
        if($stmt->execute()){}
        else{
            echo 'Update Failed';
            $stmt->close();
            $con->close();
            return;
        }
        
        $query = 'UPDATE winereview SET username = ? WHERE username = ?';
        $stmt = $con->prepare($query);
        $stmt->bind_param('ss', $new_username , $old_username);
        if($stmt->execute()){}
        else{
            echo 'Update Failed';
            $stmt->close();
            $con->close();
            return;
        }
        
        $query = 'UPDATE wineryreview SET username = ? WHERE username = ?';
        $stmt = $con->prepare($query);
        $stmt->bind_param('ss', $new_username , $old_username);
        if($stmt->execute()){
            echo 'Changes are Saved';
        }
        else{
            echo 'Update Failed';
            $stmt->close();
            $con->close();
            return;
        }
        $stmt->close();
    }
    if($new_username && !$password){
        $query = 'UPDATE users SET username = ? WHERE username = ?';
        $stmt = $con->prepare($query);
        $stmt->bind_param('ss', $new_username , $old_username);
        if($stmt->execute()){}
        else{
            echo 'Update Failed';
            $stmt->close();
            $con->close();
            return;
        }
        $query = 'UPDATE winejournal SET username = ? WHERE username = ?';
        $stmt = $con->prepare($query);
        $stmt->bind_param('ss', $new_username , $old_username);
        if($stmt->execute()){}
        else{
            echo 'Update Failed';
            $stmt->close();
            $con->close();
            return;
        }

        $query = 'UPDATE wineryjournal SET username = ? WHERE username = ?';
        $stmt = $con->prepare($query);
        $stmt->bind_param('ss', $new_username , $old_username);
        if($stmt->execute()){}
        else{
            echo 'Update Failed';
            $stmt->close();
            $con->close();
            return;
        }

        $query = 'UPDATE winereview SET username = ? WHERE username = ?';
        $stmt = $con->prepare($query);
        $stmt->bind_param('ss', $new_username , $old_username);
        if($stmt->execute()){}
        else{
            echo 'Update Failed';
            $stmt->close();
            $con->close();
            return;
        }
        $query = 'UPDATE wineryreview SET username = ? WHERE username = ?';
        $stmt = $con->prepare($query);
        $stmt->bind_param('ss', $new_username , $old_username);
        if($stmt->execute()){
            echo 'Changes are Saved';
        }
        else{
            echo 'Update Failed';
            $stmt->close();
            $con->close();
            return;
        }
        $stmt->close();
    }
    if(!$new_username && $password){
        $newPass = hash( "sha256" , $password);
        $query = 'UPDATE users SET password = ? WHERE username = ?';
        $stmt = $con->prepare($query);
        $stmt->bind_param('ss', $newPass, $old_username);
        if($stmt->execute()){
            echo 'Changes are Saved';
        }
        else{
            echo 'Update Failed';
            $stmt->close();
            $con->close();
            return;
        }
        $stmt->close();
    }
    $con->close();

}

?>
