<?php
include 'http_request.php';
ini_set('display_errors','On');
error_reporting(E_ALL);
$method = 'GET';
$headers = array("Content-type" => "application/json", "charset" => "utf-8");

$url = "http://47.94.201.157:9090/api/dkt/main/get_introduction/";
$res = http_request($method,$url,$_POST,$headers);
$res = json_encode($res);
echo $res;

?>