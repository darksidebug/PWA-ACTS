<?php
$actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";

$url = explode(':', $actual_link);

if($url[0] === 'http')
{
    header('Location: http:'.$url[1].'/views/pages/v2');
}
else
{
    header('Location: https:'.$url[1].'/views/pages/v2');
}

// include 'views/pages/index.php';