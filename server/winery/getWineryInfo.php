<?php header('content-type: application/json; charset=utf-8');
/**
 * Created by JetBrains PhpStorm.
 * Date: 5/28/13
 * Time: 11:34 PM
 * To change this template use File | Settings | File Templates.
 */
$wineryId = $_GET['iwineId'];


//$json_url = 'http://www.iwinedb.com/WineDetails.aspx?wid=294095';
//$json_url = 'http://www.iwinedb.com/WineDetails.aspx?wid=199730';
//$json_url = 'http://www.iwinedb.com/WineDetails.aspx?wid=309744';

//
//
//$json_url = 'http://iwinedb.com/WineryDetails.aspx?wid=2730';
//$json_url = 'http://iwinedb.com/WineryDetails.aspx?wid=3414';


$json_url = 'http://iwinedb.com/WineryDetails.aspx?wid=1603' . $wineryId;

$text = file_get_contents($json_url) ; // scrape page into variable
$text_String = htmlentities(json_encode($text)) ;

//echo $text_String;




$phone = explode("&lt;span id=\\&quot;LabelPhone\\&quot;&gt;", $text_String);
$phone = getData($phone[1]);

$fax = explode("&lt;span id=\\&quot;LabelFax\\&quot;&gt;", $text_String);
$fax = getData($fax[1]);

$makers = explode("HyperLinkWineMakers\\&quot;&gt;&lt;font color=\\&quot;#478DB1\\&quot;&gt;", $text_String);
$makers = getData($makers[1]);

$owners = explode("HyperLinkOwners\\&quot;&gt;&lt;font color=\\&quot;#478DB1\\&quot;&gt;", $text_String);
$owners = getData($owners[1]);

$varietals = explode("&lt;span id=\\&quot;LabelVarietals\\&quot;&gt;", $text_String);  //[1]
$varietals = getData($varietals[1]);

$hours = explode("LabelVisitingPolicy\\&quot;&gt;&lt;font face=\\&quot;Arial\\&quot; color=\\&quot;#478DB1\\&quot;&gt;", $text_String);  //[1]
$hours = getData($hours[1]);

$website = explode("HyperLinkWebSite\\&quot; title=\\&quot;Open http:\\/\\/", $text_String);   //[11], has reviews scores here
$website = getLink($website[1]);


$email = explode("HyperLinkEmail\\&quot; title=\\&quot;Send Email to ", $text_String);   //[11], has reviews scores here
$email = getEmail($email[1]);


////print_r (  $pic);
//
//
$jsonArray = array(
    'phone'          => $phone,
    'fax'            =>$fax,
    'wineMakers'     => $makers,
    'owners'         => $owners,
    'varietalsGrown' => $varietals,
    'website'        =>$website,
    'businessHours'        =>$hours,
    'email'          =>$email,);
//
//
if(count($jsonArray) == 0){
    return;
}
echo (json_encode($jsonArray));
//
function getData($text)   //grab the really value of each field.
{
    return substr($text, 0, strpos($text, "&lt;"));
}
function getLink($text)   //grab the really value of each field.
{
    return substr($text, 0, strpos($text, " "));
}
function getEmail($text)   //grab the really value of each field.
{
    return substr($text, 0, strpos($text, "\\&quot;"));
}


?>
