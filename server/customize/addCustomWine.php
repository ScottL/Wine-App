<?php  header('content-type: application/json; charset=utf-8');
/**
 * Created by JetBrains PhpStorm.
 * Date: 5/22/13
 * Time: 11:04 PM
 * To change this template use File | Settings | File Templates.
 */

include('../../../../connect/connect.php');

//$con = connectIpage('winebook');
$con = connectLocal('winebook');

if ($con){

    $username =  $_POST['username'];
    $choice =  $_POST['listOption'];
    $wineName =  $_POST['wineName'];
    $tried =  $_POST['tried'];
    $toTry =  $_POST['totry'];
    $fav =  $_POST['favorited'];
    $wineId = 0;
    //check if wine is already in wines table:
    $query = "SELECT id FROM wines where name  = ? AND iwineid = -1 LIMIT 0,1";
    if ($stmt = $con->prepare($query)) {
        $stmt->bind_param('s', $wineName);
        //$username = $username;
        if($stmt->execute()){

            $stmt->store_result();
            if($stmt->num_rows >0){
                $stmt->bind_result($id);
                while ($stmt->fetch()) {
                    $wineId = $id;
                }

                //check if wine is in wineJournal table:
                $query = "SELECT id FROM winejournal where wineid  = ? LIMIT 0,1";
                if ($stmt = $con->prepare($query)) {
                    $stmt->bind_param('i', $wineId);
                    if($stmt->execute()){

                        $stmt->store_result();
                        if($stmt->num_rows >0){
                            //update wineJournal:
                            if($fav){ //updating wineJournal:
                                $query = "UPDATE winejournal SET favorited = 1 WHERE wineid = ? AND username =?";

                            }
                            else{
                                $query = "UPDATE winejournal SET tried =?, totry = ? WHERE wineid = ? AND username =?";
                            }
                            if($updateQuery = $con->prepare($query))
                            {
                                if($fav){
                                    $updateQuery->bind_param('is', $wineId, $username);
                                }
                                else{

                                    $updateQuery->bind_param('iiis', $tried,$toTry,$wineId, $username);
                                }

                                if(!$updateQuery->execute()){
                                }
                                else{
                                    echo 'Update Success';
                                }
                            }
                        }
                        else{
                            if($qry = $con->prepare("INSERT INTO winejournal (wineid, username, favorited, tried,totry, iwineid)
                                            VALUES(?,?,?,?,?, -1)") )
                            {
                                $qry->bind_param( 'isiii' , $wineId, $username,$fav, $tried, $toTry);

                                if($qry->execute()){
                                    echo "Added to WineJournal";
                                }
                                else{
                                    echo "Adding to WineJournal Failed";
                                }
                                //echo 'new wineId ' + $wineId;
                                $qry->close();
                            }
                        }
                    }
                }

            }
            else{ //add to wines table:
                if($qry = $con->prepare("INSERT INTO wines (name, winery, varietal, type, vintage, price, cases, enthusiastScore,
                                        spectatorScore, advocateScore, picture, sweetness, boldness, iwineid)
                                        VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,-1)") )
                {
                    $qry->bind_param( 'ssssidsiiisii' ,$wineName,$winery,$varietal,$type,$vintage,$price,$cases,$enthusiastScore,$spectatorScore,
                        $advocateScore, $picture,$sweet,$boldness);
                    $winery =            $_POST['winery'];
                    $varietal =          $_POST['varietal'];
                    $type =              $_POST['type'];
                    $vintage =           $_POST['vintage'];
                    $price =             $_POST['releasePrice'];
                    $cases =             $_POST['casesMade'];
                    $enthusiastScore =   $_POST['enthusiast'];
                    $spectatorScore =    $_POST['spectator' ];
                    $advocateScore =     $_POST['advocate'  ];
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
                //Adding to winejournal table:
                if($insertQry = $con->prepare("INSERT INTO winejournal (wineid, username, favorited, tried,totry, iwineid)
                                            VALUES(?,?,?,?,?,-1)") )
                {
                    $insertQry->bind_param( 'isiii' , $wineId, $username,$fav, $tried, $toTry);

                    if($insertQry->execute()){
                        echo "Added to WineJournal";
                    }
                    else{
                        echo "Add to WineJournal Failed";
                    }
                    $insertQry->close();
                }


            }
        }
    }




    $con->close();
}

?>
