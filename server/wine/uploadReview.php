<?php  header('content-type: application/json; charset=utf-8');
/**
 * Created by JetBrains PhpStorm.
 * Date: 5/14/13
 * Time: 12:01 AM
 * To change this template use File | Settings | File Templates.
 */
include('../../../../connect/connect.php');

//$con = connectIpage('winebook');
$con = connectLocal('winebook');

if ($con){
    $name = $_POST['username'];
    $iwine = $_POST['iwineId'];
    $review = $_POST['review'];

    $wineId = $_POST['wineId'];

    $winery_mode = $_POST['winery_mode'];  // if winery_mode != NULL
//    if($sql_check = $con->prepare("SELECT id FROM wines WHERE iwineid =  ?"))
//    { //check if wine is already in wines db:
//        $sql_check->bind_param('i', $iwine);
//        $iwine = $iwine;
//
//        if($sql_check->execute()){
//
//            $sql_check->store_result();
//
//            if($sql_check->num_rows >0){
//                $sql_check->bind_result($wine_id);
//                /* bind result variables */
//                while($sql_check->fetch()){
//                    $wineId = $wine_id;
//                }
//            }
//        }
//        else{
//            echo 'Wines Table Connection Failed';
//            $con->close();
//            return;
//        }
//    }
    if(!$winery_mode){
        if($wineId != -1){ //add wineid to winereview table:
            if($qry = $con->prepare("INSERT INTO winereview (username, iwineid, wineid, review) VALUES (?,?,?,?)")){

                $qry->bind_param('siis', $name,$iwine,$wineId,$review);
                $iwine = $iwine;
                $name = $name;
                $wineId = $wineId;
                $review = $review;
                if($qry->execute()){
                    echo('Insertion Success');

                }
                else{
                    echo 'Insertion Failed';
                }
            }

        }
        else{
            if($qry = $con->prepare("INSERT INTO winereview (username, iwineid,review) VALUES (?,?,?)"))
            {

                $qry->bind_param('sis', $name,$iwine,$review);
                $iwine = $iwine;
                $name = $name;
                $review = $review;
                if($qry->execute()){
                    echo('Insertion Success');
                }
                else{
                    echo 'Insertion Failed';
                }
            }
        }
    }
    else{ //Add Winery mode:
        //getting winery id in wineries table:



        if($qry = $con->prepare("INSERT INTO wineryreview (username, iwineid, wineryid, review) VALUES (?,?,?,?)"))
        {
            $wineryId = null;
            $sql_check = "SELECT id FROM wineries WHERE iwineid =  " .$iwine. " LIMIT 0,1";

            $result = $con->query($sql_check);
            if($result->num_rows > 0)
            {
                $row = $result->fetch_assoc();
                $wineryId = $row['id'];
            }

            $qry->bind_param('siis', $name,$iwine,$wineryId,$review);
            $iwine = $iwine;
            $name = $name;
            $review = $review;

            if($qry->execute()){
                echo('Insertion Success');

            }
            else{
                echo 'Insertion Failed';
            }
        }

    }

    $con->close();
}




?>
