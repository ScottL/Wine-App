<?php
/**
 * Created by JetBrains PhpStorm.
 * Date: 5/19/13
 * Time: 1:57 AM
 * To change this template use File | Settings | File Templates.
 */

include('../../../../connect/connect.php');

//$con = connectIpage('winebook');
$con = connectLocal('winebook');

if ($con){
    $name = $_POST['username'];
    $iwine = $_POST['iwineId'];
    $tried = $_POST['tried'];   //could be visited in case of Add Winery.
    $wine_db_id = $_POST['wineid'];

    $winery_mode = $_POST['winery_mode'];  // if winery_mode != NULL

        //checking if wine is already on the list:
        $sql_check = "SELECT tried, totry, id FROM winejournal WHERE iwineid =  ".$iwine." AND username='". $name ."'LIMIT 0,1";

        if($wine_db_id){
            $sql_check = "SELECT tried, totry, id FROM winejournal WHERE wineid =  ".$wine_db_id." AND username='". $name ."'LIMIT 0,1";
        }

        if($winery_mode){
            $sql_check = "SELECT visited, tovisit, id FROM wineryjournal WHERE iwineid =  ".$iwine." AND username='". $name ."'LIMIT 0,1";
        }

        $result = $con->query($sql_check);
        if($result->num_rows > 0){
            $row = $result->fetch_assoc();
            $myTried = $row['tried'];
            $myToTry = $row['totry'];
            $id = $row['id'];

            if($winery_mode){
                $myTried = $row['visited'];
                $myToTry = $row['tovisit'];
            }

            if( ($myTried == 1 && $tried == 1)   || ($myToTry==1 && $tried == 0)){ //just return
                echo 'Already in the List';
                $con->close();
                return;
            }
            else{
                $query = "UPDATE winejournal SET tried=1, totry=0 WHERE id=" . $id;
                if($winery_mode){
                    $query = "UPDATE wineryjournal SET visited=1, tovisit=0 WHERE id=" . $id;
                }
                if($tried == 0){
                    $query = "UPDATE winejournal SET tried=0, totry=1 WHERE id=" . $id;
                    if($winery_mode){
                        $query = "UPDATE wineryjournal SET visited=0, tovisit=1 WHERE id=" . $id;
                    }
                }

                if(mysqli_query($con,$query)){
                    echo 'Updated';
                }
                else{
                    echo 'Failed';
                }
            }
        }
        else{ //Adding to winejournal and wines tables:

            //adding to wines db:  1. check if wine is already in db; 2. Add if not.
            $wineId = 0;
            if($wine_db_id){
                $wineId = $wine_db_id;
            }
            else{
                $sql_check = "SELECT id FROM wines WHERE iwineid =  ".$iwine." LIMIT 0,1";
                if($winery_mode){
                    $sql_check = "SELECT id FROM wineries WHERE iwineid =  ".$iwine." LIMIT 0,1";
                }
                $result = $con->query($sql_check);
                if($result->num_rows > 0){
                    $row = $result->fetch_assoc();
                    $wineId = $row['id'];
                    //echo 'already in wines: ' + $wineId;
                }
                else{//add to wine db
                    if(!$winery_mode){
                        if($qry = $con->prepare("INSERT INTO wines (name, winery, varietal, type, vintage, price, cases, enthusiastScore,
                                                spectatorScore, advocateScore, iwineid, picture, sweetness, boldness)
                                                VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)") )
                        {
                            $qry->bind_param( 'ssssidsiiiisii' ,$wineName,$winery,$varietal,$type,$vintage,$price,$cases,$enthusiastScore,$spectatorScore,
                                $advocateScore, $iwine, $picture,$sweet, $boldness);
                            $winery =            $_POST['winery'];
                            $varietal =          $_POST['varietal'];
                            $type =              $_POST['varietalType'];
                            $vintage =           $_POST['vintage'];
                            $price =             $_POST['releasePrice'];
                            $cases =             $_POST['casesMade'];
                            $enthusiastScore =   $_POST['wineEnthusiastScore'];
                            $spectatorScore =    $_POST['wineSpectatorScore' ];
                            $advocateScore =     $_POST['wineAdvocateScore'  ];
                            $picture =           $_POST['picture'];
                            $wineName =          $_POST['wineName'];
                            $sweet =             $_POST['sweetness'];
                            $boldness =          $_POST['boldness'];

                            if(! $qry->execute()){
                                echo 'Add to Wine DB Failed';
                                $con->close();
                                return;
                            }
                            $wineId = $con->insert_id;   //get generated wineid
                            //echo 'new wineId ' + $wineId;
                            $qry->close();
                        }
                    }
                    else{
                        if($qry = $con->prepare("INSERT INTO wineries (name, address, city, state, zipCode, country, phone, fax,
                                            website, email, owners, winemakers,hours, varietals, picture, iwineid )
                                            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)") )
                        {
                            $qry->bind_param( 'ssssisssssssssss' ,$wineryName,$address,$city,$state,$zipCode,$country,$phone,$fax,$website,
                                $email, $owners, $winemakers,$hours,$varietals, $picture, $iwineid);
                            $wineryName =            $_POST['name'];
                            $address =          $_POST['address'];
                            $city =              $_POST['city'];
                            $state =           $_POST['state'];
                            $zipCode =             $_POST['zipCode'];
                            $country =             $_POST['country'];
                            $phone =   $_POST['phone'];
                            $fax =    $_POST['fax' ];
                            $website =     $_POST['website'  ];
                            $email =           $_POST['email'];
                            $owners =          $_POST['owners'];
                            $winemakers =             $_POST['wineMakers'];
                            $hours =          $_POST['businessHours'];
                            $varietals =          $_POST['varietalsGrown'];
                            $picture =          $_POST['picture'];
                            $iwineid =          $_POST['iwineId'];

                            if(! $qry->execute()){
                                echo 'Add to Wine DB Failed';
                                $con->close();
                                return;
                            }
                            $wineId = $con->insert_id;   //get generated wineid
                            //echo 'new wineId ' + $wineId;
                            $qry->close();
                        }
                    }
                }
            }
            $string = "INSERT INTO winejournal (username, iwineid, tried, wineid, totry) VALUES(?,?,?,?,?)";
            if($winery_mode){
                $string = "INSERT INTO wineryjournal (username, iwineid, visited, wineryid,tovisit) VALUES(?,?,?,?,?)";
            }
            if($favQuery = $con->prepare($string))
            {
                //echo($name);
                $favQuery->bind_param('siiii', $name, $iwine, $tried, $wineId, $totry);
                $name = $name;
                $iwine = $iwine;
                $wineId = $wineId;
                if($tried == 1){
                    $tried = 1;
                    $totry = 0;
                }else{
                    $tried = 0;
                    $totry = 1;
                }
                if(!$winery_mode){
                    if($favQuery->execute()){
                        echo 'Wine is Added';
                    }
                    else{
                        echo 'Adding Wine Failed';
                    }
                }
                else{
                    if($favQuery->execute()){
                        echo 'Winery is Added';
                    }
                    else{
                        echo 'Adding Winery Failed';
                    }
                }
            }


        }
 $con->close();
}

?>
