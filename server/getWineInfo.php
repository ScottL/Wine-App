<?php header('content-type: application/json; charset=utf-8');
/**
 * Created by JetBrains PhpStorm.
 * Date: 4/19/13
 * Time: 1:09 AM
 * To change this template use File | Settings | File Templates.
 */

$wineId = $_GET['wineId'];


//$json_url = 'http://www.iwinedb.com/WineDetails.aspx?wid=294095';
//$json_url = 'http://www.iwinedb.com/WineDetails.aspx?wid=199730';
//$json_url = 'http://www.iwinedb.com/WineDetails.aspx?wid=309744';
//$json_url = 'http://www.iwinedb.com/WineDetails.aspx?wid=199730';
$json_url = 'http://www.iwinedb.com/WineDetails.aspx?wid=' . $wineId;



$text = file_get_contents($json_url) ; // scrape page into variable
$text_String = htmlentities(json_encode($text)) ;

//echo $text_String;

//$b = strpos($text_String, 'LabelVarietalType');
//echo substr($text_String, $b + (strlen('LabelVarietalType') -1) +  3, $b + (strlen('LabelVarietalType') -1) +  3 + 5 );

$pic = explode("href=\\&quot;", $text_String);
$pic = substr($pic[1], 0, strpos($pic[1], "\\&quot;"));
if(strpos($pic, "NoWineLabel") != false){
    $pic = '';
}
$type = explode("&lt;span id=\\&quot;LabelVarietalType\\&quot;&gt;", $text_String);
$type = getData($type[1]);
$year = explode("&lt;span id=\\&quot;LabelVintage\\&quot;&gt;", $text_String);
$year = getData($year[1]);
$price = explode("&lt;span id=\\&quot;LabelReleasePrice\\&quot;&gt;", $text_String);
$price = getData($price[1]);
$varietal = explode("&lt;span id=\\&quot;LabelVarietal\\&quot;&gt;", $text_String);
$varietal = getData($varietal[1]);
$cases = explode("&lt;span id=\\&quot;LabelCasesMade\\&quot;&gt;", $text_String);  //[1]
$cases = getData($cases[1]);
$wineryArr = explode("#478DB1\\&quot;&gt;", $text_String);   //[11], has reviews scores here
$winery = getData($wineryArr[11]);
$spectatorScore = getData($wineryArr[9]);
$enthusiastScore = getData($wineryArr[8]);
$advocateScore = getData($wineryArr[10]);

//print_r (  $pic);


$jsonArray = array( 'winery'                => $winery,
                    'varietal'              =>$varietal,
                    'varietalType'          => $type,
                    'vintage'               => $year,
                    'releasePrice'          => $price,
                    'casesMade'             =>$cases,
                    'wineEnthusiastScore'   =>$enthusiastScore,
                    'wineSpectatorScore'    => $spectatorScore,
                    'wineAdvocateScore'     => $advocateScore,
                    'picture'               => $pic,
                    'iwineId'               => $wineId);


if(count($jsonArray) == 0){
    return;
}
echo (json_encode($jsonArray));

function getData($text)   //grab the really value of each field.
{
    return substr($text, 0, strpos($text, "&lt;"));
}

?>








