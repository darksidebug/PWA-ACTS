<?php

require '../connection/database-connection.php';

$upload_data = [];
$query = "";

$connection = $db_con->mysqlConnection();
if($connection['con'] == true)
{
    $insert ="INSERT INTO `entry` (`household_number`, `first_name`, `middle_name`, `last_name`, `contact_number`, `address`, `visited`, `entry_date`, `entry_added`, `type`)";
    $values = " VALUES ('".$_POST['household_number']."', '".$_POST['first_name']."', '".$_POST['middle_name']."', '".$_POST['last_name']."', '".$_POST['contact_number']."', '".$_POST['address']."', '".$_POST['visited']."', '".$_POST['entry_date']."', '".$_POST['entry_added']."', '".$_POST['type']."')";
    $result = mysqli_query($db_con->con, $insert."".$values);

    if ($result) {
        $upload_data = [
            'con' => true,
            'sync' => true,
            'count' => ($_POST['count'] + 1),
            'in' => ($_POST['count'] + 1)
        ];
    }
    else{
        $upload_data = [
            'con' => true,
            'sync' => false,
            'count' =>  ($_POST['count'] + 1),
            'in' => ($_POST['count'] + 0)
        ];
    }
}
else
{
    $upload_data = [
        'con' => false,
        'sync' => false,
        'count' => $_POST['count'],
        'in' => ($_POST['count'] + 0)
    ];
}

echo json_encode($upload_data);