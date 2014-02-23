<?php header('content-type: application/json; charset=utf-8');
/**
 * if favorited = 1, change to 0, and otherwise.
 * Date: 5/15/13
 * Time: 10:03 PM
 * To change this template use File | Settings | File Templates.
 */

include('../../../../connect/connect.php');

//$con = connectIpage('winebook');
$con = connectLocal('winebook');

if ($con){
    $name = $_POST['username'];
    $iwine = $_POST['iwineId'];  //could be wineryid incase of winery.
    $wine_db_id = $_POST['wineid'];
    $checkingOnly = $_POST['checking'];

    $winery_mode = $_POST['winery_mode'];  // if winery_mode != NULL

//    $iwine = 199730;
//    $name ='huy';
//    $checkingOnly = 0;

    if($checkingOnly == 1){  //performing checking for the starting of wineInfo page.
        $sql_check = "SELECT favorited, id FROM winejournal WHERE iwineid =  ".$iwine." AND username='". $name ."'LIMIT 0,1";
        if($wine_db_id){ //custom wine
            $sql_check = "SELECT favorited, id FROM winejournal WHERE wineid =  ".$wine_db_id." AND username='". $name ."'LIMIT 0,1";
        }
        if($winery_mode){
            $sql_check = "SELECT favorited, id FROM wineryjournal WHERE iwineid =  ".$iwine." AND username='". $name ."'LIMIT 0,1";
        }

        $result = $con->query($sql_check);
        if($result->num_rows > 0)
        {

            $row = $result->fetch_assoc();
            $favorited = $row['favorited'];
            $id = $row['id'];


            if($favorited == 1){
                echo 'Favorited';
            }
            else{
                echo 'Not Favorited';
            }
        }
        else{
            echo 'Not Favorited';
        }
        $con->close();
        return;
    }//end checking



    $sql_check = "SELECT favorited, tried, totry, id FROM winejournal WHERE iwineid =  ".$iwine." AND username='". $name ."'LIMIT 0,1";
    if($wine_db_id){ //custom wine
        $sql_check = "SELECT favorited, tried, totry, id FROM winejournal WHERE wineid =  ".$wine_db_id." AND username='". $name ."'LIMIT 0,1";
    }

    if($winery_mode){
        $sql_check = "SELECT favorited, visited, tovisit, id FROM wineryjournal WHERE iwineid =  ".$iwine." AND username='". $name ."'LIMIT 0,1";
    }
    $result = $con->query($sql_check);
    if($result->num_rows > 0)
    { //updating favorite

        $row = $result->fetch_assoc();
        $favorited = $row['favorited'];
        $tried = $row['tried'];
        $totry = $row['totry'];
        $id = $row['id'];
        if($winery_mode){
            $tried = $row['visited'];
            $totry = $row['tovisit'];
        }

        if($favorited == 1 && $tried == 0 && $totry == 0){ // only deleting wine when it doesn't belong to any other list.
            $query = "DELETE FROM winejournal WHERE id=" . $id;
            if($winery_mode){
                $query = "DELETE FROM wineryjournal WHERE id=" . $id;
            }
            if(!mysqli_query($con,$query)){
                echo 'Deleting Favorite Failed';
            }
            else{
                echo 'Deleting Favorite Success';
            }
        }
        elseif($favorited == 1){//favorited = 0;
            $query = "UPDATE winejournal SET favorited=0 WHERE id=" . $id;

            if($winery_mode){
                $query = "UPDATE wineryjournal SET favorited=0 WHERE id=" . $id;
            }

            if(!mysqli_query($con,$query)){
                echo 'Update UnFavorite Failed';
            }
            else{
                echo 'Update UnFavorite Success';
            }
        }
        else{
            $query = "UPDATE winejournal SET favorited=1 WHERE id=" . $id;

            if($winery_mode){
                $query = "UPDATE wineryjournal SET favorited=1 WHERE id=" . $id;
            }

            if(!mysqli_query($con,$query)){
                echo 'Update Favorite Failed';
            }
            else{
                echo 'Update Favorite Success';
            }

        }

    }
    else{ //Adding to favorite list and wine db.
        $wineId = 0;
        if($wine_db_id){
            $wineId = $wine_db_id;
        }
        else{

            //adding to wines db:  1. check if wine is already in db; 2. Add if not.
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
                            $advocateScore, $iwine, $picture,$sweet,$boldness);
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
                else{//add to wineries table:
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
        //Adding to favorite list:
        $string = "INSERT INTO winejournal (username, iwineid, favorited, wineid) VALUES(?,?,?,?)";
        if($winery_mode){
            $string = "INSERT INTO wineryjournal (username, iwineid, favorited, wineryid) VALUES(?,?,?,?)";
        }
        if($favQuery = $con->prepare($string))
        {
            //echo($name);
            $favQuery->bind_param('siii', $name, $iwine, $fav, $wineId);
            $name = $name;
            $iwine = $iwine;
            $wineId = $wineId;
            $fav = 1;

            if(!$winery_mode){
                if(! $favQuery->execute()){
                    echo 'Favorite Wine Failed';
                }
                else{
                    echo 'Added to Favorite';
                }
            }
            else{
                if(! $favQuery->execute()){
                    echo 'Favorite Winery Failed';
                }
                else{
                    echo 'Added to Favorite';
                }
            }
        }

    }
    $con->close();
}


?>
