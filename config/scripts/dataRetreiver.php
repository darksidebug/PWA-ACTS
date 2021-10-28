<?php

session_start();
require '../connection/database-connection.php';

$result_per_page = 50000;
$page = 0;
$arr = array();
$i = 0;
$rows= 0;
$row = 0;
$per_page = 0;
$lastIndexedDBId = 0;
$query1 = "";
$new_query = "";
$maxID = 0;
$count = 0;
$connection = $db_con->mysqlConnection();

if($connection['con'] == true)
{
    $lastIndexedDBId = isset($_POST['id']) && $_POST['id'] != '' ? $_POST['id'] : 0;
    $query = "SELECT COUNT(*) as 'count' FROM `person` WHERE `id` > ".$lastIndexedDBId."";
    $result = mysqli_query($db_con->con, $query);
    while($r = mysqli_fetch_array($result))
    {
        $row = !empty($r['count']) ? $r['count'] : 0;
    }

    $select = "SELECT * FROM `person` WHERE `id` > ".$lastIndexedDBId."";
    $result = mysqli_query($db_con->con, $select);
    $rows = mysqli_num_rows($result);
    $per_page = ceil($rows/$result_per_page);

    $data = [];

    if(!isset($_POST['page']))
    {
        $arr = array();
        $page = $_POST['page'] = 1;
    }
    else
    {
        $arr = array();
        $page = $_POST['page'];
    }

    $first_page = ($page - 1) * $result_per_page;

    $select = "SELECT * FROM `person` LEFT JOIN `vaccination_statuses` ON `person`.`id` = `vaccination_statuses`.`person_id`";
    $where = " WHERE `person`.`id` > ".$lastIndexedDBId." LIMIT ". $first_page .", ". $result_per_page ." ";

    $results = mysqli_query($db_con->con, $select."".$where);
    while($r = mysqli_fetch_array($results))
    {
        $arr[$i] = $r;
        $i++;
    }

    $data = [
        'con' => true,
        'per_page' => $per_page,
        'page' => $page,
        'data' => $arr,
        'count' => count($arr),
        'last_id' => $lastIndexedDBId,
        'row' => $row,
        'total_records' => $rows,
    ];
}
else
{
    $data = [
        'con' => false,
        'last_id' => $lastIndexedDBId,
        'page' => $page,
    ];
}

echo json_encode($data);