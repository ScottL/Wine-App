<?php header('content-type: application/json; charset=utf-8');
/**
 * Created by JetBrains PhpStorm.
 * Date: 5/8/13
 * Time: 1:40 AM
 * To change this template use File | Settings | File Templates.
 */

include('../../../../connect/connect.php');

//$con = connectIpage('winebook');
$con = connectLocal('winebook');

if ($con){
    $iwineId = $_POST['iwineId'];
    $wineId = $_POST['wineId'];
    $winery_mode = $_POST['winery_mode'];  // if winery_mode != NULL
    //$iwineId = 10;
    $qry = "select username, review, created from winereview where iwineid = '".$iwineId."'
            order by created desc";
    if($winery_mode){
        $qry = "select username, review, created from wineryreview where iwineid = '".$iwineId."'
            order by created desc";
    }
    else{
        if($iwineId == -1){
            $qry = "select username, review, created from winereview where wineid = '".$wineId."'
            order by created desc";
        }
    }
    if ($result = $con->query($qry)) {

        //$jsonResult = array('total' => $result->num_rows);

        while($row = $result->fetch_assoc()){

            $jsonResult[] = $row;

        }
        echo json_encode($jsonResult);
        $result->close();
    }
    else{
        echo 'Table Allocation Failed';
    }

    $con->close();
}
?>
