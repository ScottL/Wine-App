<?php  header('content-type: application/json; charset=utf-8');
/**
 * Created by JetBrains PhpStorm.
 * Date: 5/30/13
 * Time: 12:03 AM
 * To change this template use File | Settings | File Templates.
 */

include('../../../../connect/connect.php');

//$con = connectIpage('winebook');
$con = connectLocal('winebook');

if ($con){

    $username =  $_GET['username'];
    $choice =  $_GET['option'];

//    $username = 'huy';
//    $choice =  0;

    $query='';
    switch ($choice){
        case 0: //favorite winery
            $query = "SELECT wineryid FROM wineryjournal where favorited  = 1 AND username = ?";
            break;
        case 1: //visited
            $query = "SELECT wineryid FROM wineryjournal where visited  = 1 AND username = ?";
            break;
        default: //toVisit
            $query = "SELECT wineryid FROM wineryjournal where tovisit  = 1 AND username = ?";
    }
    if ($stmt = $con->prepare($query)) {
        $stmt->bind_param('s', $username);
        $username = $username;
        if($stmt->execute()){
            $jsonArray = array();
            /* store result */
            $stmt->store_result();
            if($stmt->num_rows >0){
                /* bind result variables */
                $stmt->bind_result($wineId);
                if($qry = $con->prepare("SELECT name, address, city, state, zipCode, country, phone, fax,
                                        website, email, owners, winemakers, hours, varietals, picture, iwineid
                                        FROM wineries WHERE id = ?") )
                {
                    /* fetch values */
                    while ($stmt->fetch()) {
                        $qry->bind_param('i', $wineId);
                        if($qry->execute()){
                            $qry->bind_result($name, $address, $city, $state, $zip, $country, $phone, $fax,
                                $website, $email, $owners, $winemakers, $hours, $varietals, $picture, $iwineID);
                            while ($qry->fetch()){
                                $value = array(
                                    'name'        =>$name,
                                    'address'           =>$address,
                                    'city'         =>$city,
                                    'state'       =>$state,
                                    'zipCode'   =>$zip,
                                    'country'        =>$country,
                                    'phone'   =>$phone,
                                    'fax'      =>$fax,
                                    'website'=>$website,
                                    'email' =>$email,
                                    'owners'  =>$owners,
                                    'wineMakers'        => $winemakers,
                                    'businessHours'        =>$hours,
                                    'varietalsGrown'      =>$varietals,
                                    'picture'       =>$picture,
                                    'iwineId'        =>$iwineID,
                                    'wineryId'        =>$wineId);
                                array_push($jsonArray, $value);
                            }
                        }


                    }
                }

            }
        }
        else{
            echo 'Failed to Collect wineId';
            $con->close();
            return;
        }


    }
    echo (json_encode($jsonArray));

    $con->close();
}

?>
