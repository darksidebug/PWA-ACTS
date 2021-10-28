<?php

session_start();
unset($_SESSION['user']);
unset($_SESSION['name']);

$actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";

$url = explode(':', $actual_link);

if($url[0] === 'http')
{
    header('Location: https:'.$url[1].'/views/pages');
}
else
{
    header('Location: https:'.$url[1].'/views/pages');
}
