<?php  header('content-type: application/json; charset=utf-8');
/**
 * Created by JetBrains PhpStorm.
 * Date: 5/21/13
 * Time: 12:01 AM
 * To change this template use File | Settings | File Templates.
 */

include('../../../../connect/connect.php');

//$con = connectIpage('winebook');
$con = connectLocal('winebook');

if ($con){

    $username =  $_GET['username'];
    $choice =  $_GET['choice'];

//    $username = 'huy';
//    $choice =  0;

    $query='';
    switch ($choice){
        case 0: //favorite wines
            $query = "SELECT wineid FROM winejournal where favorited  = 1 AND username = ?";
            break;
        case 1: //tried
            $query = "SELECT wineid FROM winejournal where tried  = 1 AND username = ?";
            break;
        default: //toTry
            $query = "SELECT wineid FROM winejournal where totry  = 1 AND username = ?";
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
                if($qry = $con->prepare("SELECT name, winery, varietal, type, vintage, price, cases, enthusiastScore,
                                        spectatorScore, advocateScore, iwineid, picture, sweetness, boldness, created
                                        FROM wines WHERE id = ?") )
                {
                    /* fetch values */
                    while ($stmt->fetch()) {
                        $qry->bind_param('i', $wineId);
                        if($qry->execute()){
                            $qry->bind_result($name, $winery, $varietal, $type, $vintage, $price, $cases, $enthusiastScore,
                                                $spectatorScore, $advocateScore, $iwineId, $picture, $sweetness, $boldness, $created);
                            while ($qry->fetch()){
                                $value = array(
                                    'iwineId'        =>$iwineId,
                                    'name'           =>$name,
                                    'winery'         =>$winery,
                                    'varietal'       =>$varietal,
                                    'varietalType'   =>$type,
                                    'vintage'        =>$vintage,
                                    'releasePrice'   =>$price,
                                    'casesMade'      =>$cases,
                                    'wineEnthusiastScore'=>$enthusiastScore,
                                    'wineSpectatorScore' =>$spectatorScore,
                                    'wineAdvocateScore'  =>$advocateScore,
                                    'wineId'        => $wineId,
                                    'picture'        =>$picture,
                                    'sweetness'      =>$sweetness,
                                    'boldness'       =>$boldness,
                                    'created'        =>$created);
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
