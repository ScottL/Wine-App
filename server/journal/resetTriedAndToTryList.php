<?php header('content-type: application/json; charset=utf-8');
/**
 * Set tried and totry = 0 in winejournal
 * Date: 5/25/13
 * Time: 11:50 PM
 */

include('../../../../connect/connect.php');

//$con = connectIpage('winebook');
$con = connectLocal('winebook');

if ($con){

    $username =  $_POST['username'];
    $wineid = $_POST['wineid'];
    $winery_mode = $_POST['winery_mode'];
    $string = "UPDATE winejournal SET tried=0, totry = 0 WHERE wineid=? AND username =?";
    if($winery_mode){
        $string = "UPDATE wineryjournal SET visited=0, tovisit = 0 WHERE iwineid=? AND username =?";
        $wineid = $_POST['iwineid'];
    }
    if($qry = $con->prepare($string) )
    {
        $qry->bind_param( 'is', $wineid, $username);


        if(! $qry->execute()){
            echo 'Remove Failed';

        }
        else{
            echo 'Remove Success';
        }


        $qry->close();
    }


    $con->close();
}
?>
