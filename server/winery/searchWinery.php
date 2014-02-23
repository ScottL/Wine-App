<?php  header('content-type: application/json; charset=utf-8');
/**
 * Created by JetBrains PhpStorm.
 * Date: 5/28/13
 * Time: 8:23 PM
 * To change this template use File | Settings | File Templates.
 */
$wineryName = explode( " ",$_GET['wineryName']);
$searchQuery="";
for ($i = 0; $i < count($wineryName); ++$i) {
    if( $i < count($wineryName)-1){
        $searchQuery = $searchQuery . $wineryName[$i] . "%20" ;
    }
    else{
        $searchQuery = $searchQuery . $wineryName[$i];
    }
}
//in case of 1 single word:
if(count($wineryName) == 1){$searchQuery = $wineryName[0];}
//$json_url = 'http://iwinedb.com/WineriesSearch.aspx?search=1&winery=Bernardo';
//$json_url = 'http://iwinedb.com/WineriesSearch.aspx?search=1&winery=Artesa';
//$json_url = 'http://iwinedb.com/WineriesSearch.aspx?search=1&winery=Vineyards';

$json_url = 'http://iwinedb.com/WineriesSearch.aspx?search=1&winery=' . $searchQuery;


$text = file_get_contents($json_url) ; // scrape page into variable
$text_String = htmlentities(json_encode($text)) ;



//$arr = explode('DataCell', $text_String, 501);
 //  \&quot;&gt;
$arr = explode('DataCell\\&quot;&gt;', $text_String, 504);
//print_r($arr);


$name_index = 1;
$address_index = 2;
$city_index = 3;
$state_index = 4;
$zip_index = 5;
$country_index = 6;
$id_index = 7;

$jsonArray = array();
$counter = 0;
$arrayLength = count($arr);
for ($i = 0; $i < $arrayLength; ++$i) {
    if($name <= $arrayLength && $year <= $arrayLength && $id <= $arrayLength && $counter < 500){
        $wineryName = $arr[$name_index];
        $wineryName = str_replace( '&lt;\/td&gt;&lt;td class=\&quot;','',$wineryName );

        if($wineryName == ''){break;}

        $address = $arr[$address_index];
        $address = str_replace( '&lt;\/td&gt;&lt;td class=\&quot;','',$address );

        $city = $arr[$city_index];
        $city = str_replace( '&lt;\/td&gt;&lt;td class=\&quot;','',$city );

        $state = $arr[$state_index];
        $state = str_replace( '&lt;\/td&gt;&lt;td class=\&quot;','',$state );

        $zip = $arr[$zip_index];
        $zip = str_replace( '&lt;\/td&gt;&lt;td class=\&quot;','',$zip );

        $country = $arr[$country_index];
        $country = str_replace( '&lt;\/td&gt;&lt;td class=\&quot;','',$country );

        $wineryId = $arr[$id_index];
        $wineryId = str_replace( '&lt;\/td&gt;&lt;td class=\&quot;','',$wineryId );




        $value = array('address' => $address,
                        'city' => $city,
                        'state' => $state,
                        'zipCode' => $zip,
                        'country' => $country,
                        'name' => $wineryName,
                        'iwineId' => $wineryId);

        //print_r($value);
        array_push($jsonArray, $value);

        $name_index = $name_index + 9;
        $address_index = $address_index + 9;
        $city_index = $city_index + 9;
        $state_index = $state_index + 9;
        $zip_index = $zip_index + 9;
        $country_index = $country_index + 9;
        $id_index = $id_index + 9;
    }
}
if(count($jsonArray) == 0){
    return;
}
echo (json_encode($jsonArray));


?>
