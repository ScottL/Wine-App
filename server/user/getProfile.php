<?php  header('content-type: application/json; charset=utf-8');
/**
 * Created by JetBrains PhpStorm.
 * Date: 5/12/13
 * Time: 7:28 PM
 * To change this template use File | Settings | File Templates.
 */

include('../../../../connect/connect.php');

//$con = connectIpage('winebook');
$con = connectLocal('winebook');

if ($con){
    $username =  $_GET['username'];
    //$username = "huy";
    $query = "Select Count(*) as tried
                From winejournal
                Where winejournal.username ='" . $username .  "'
                AND winejournal.tried = 1
                Group by winejournal.tried;";
    $query .= "Select Count(*) as favorited
                From winejournal
                Where winejournal.username = '" . $username .  "'
                AND winejournal.favorited = 1
                Group by winejournal.favorited;";

    $query .= "Select Count(*) as favWinery
                    From wineryjournal
                    Where wineryjournal.username = '" . $username . "'
                    AND wineryjournal.favorited = 1
                    Group by wineryjournal.favorited;";
    $query .= "Select Count(*) as visited
                From wineryjournal
                Where wineryjournal.username= '" . $username . "'
                AND wineryjournal.visited = 1
                Group by wineryjournal.visited;";
    $query .= "Select Count(*) as review
                    From winereview
                    Where winereview.username = '" .  $username  . "';";

    $query .= "Select Count(*) as review
                    From wineryreview
                    Where wineryreview.username = '" . $username . "';";


    /* execute multi query */
    if ($con->multi_query($query)){

        $result =  $con->store_result();
        $row = $result->fetch_row();
        $tried = $row[0];
        if(!$tried){$tried = 0;}

        $con->next_result();

        $result =  $con->store_result();
        $row = $result->fetch_row();
        $favWine = $row[0];
        if(!$favWine){$favWine = 0;}

        $con->next_result();


        $result =  $con->store_result();
        $row = $result->fetch_row();
        $favWinery = $row[0];
        if(!$favWinery){$favWinery = 0;}

        $con->next_result();

        $result =  $con->store_result();
        $row = $result->fetch_row();
        $visited = $row[0];
        if(!$visited){$visited = 0;}
        $con->next_result();

        $result =  $con->store_result();
        $row = $result->fetch_row();
        $reviews = $row[0];
        if(!$reviews){$reviews = 0;}
        $con->next_result();


        //echo 'winereview = ' +$reviews;


        $result =  $con->store_result();
        $row = $result->fetch_row();
        $reviews = $reviews + $row[0];
        if(!$reviews){$reviews = 0;}

        //echo 'wineryreview = ' +$row[0];
        //echo 'total = ' +$reviews;

        $jsonArray = array('favWines'     => $favWine,
                            'wineTried'   => $tried,
                            'favWineries' => $favWinery,
                            'visited'     => $visited,
                            'reviews'     => $reviews,
                            'username'    => $username);
        echo (json_encode($jsonArray));
    }
    else{
        echo 'Table Allocation Failed';
    }

    $con->close();

}
?>
