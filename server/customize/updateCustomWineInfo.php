<?php
/**
 * Created by JetBrains PhpStorm.
 * Date: 5/28/13
 * Time: 4:34 AM
 * To change this template use File | Settings | File Templates.
 */

include('../../../../connect/connect.php');

//$con = connectIpage('winebook');
$con = connectLocal('winebook');

if ($con){
    if($qry = $con->prepare("UPDATE  wines  SET name = ?, winery=?, varietal=?, type=?, vintage=?, price=?, cases=?, enthusiastScore=?,
                                        spectatorScore=?, advocateScore=?, picture=?, sweetness=?, boldness=? WHERE id =?") )
    {
        $qry->bind_param( 'ssssidsiiisiii' ,$wineName,$winery,$varietal,$type,$vintage,$price,$cases,$enthusiastScore,$spectatorScore,
            $advocateScore, $picture,$sweet,$boldness, $wineId);
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
        $wineId   = $_POST['wineid'];

        if(! $qry->execute()){
            echo 'Add to Wine DB Failed';
            $con->close();
            return;
        }
        else{
            echo 'Info Update Success';
        }
        $qry->close();
    }

    $con->close();
}
?>
