<?php

session_start();
require '../connection/database-connection.php';

$login_data = [];
$success;
$data = [];
$maxID = 0;
$connection = $db_con->mysqlConnection();

if($connection['con'] == true)
{
    if(isset($_POST['login_attempt']) && $_POST['login_attempt'] == 1)
    {
        if(empty($_POST['username']) || empty($_POST['password']))
        {
            $login_data = [
                'con' => true,
                'success' => false,
                'exists' => null,
                'username' => empty($_POST['username']) ? 'Username is required' : '',
                'password' => empty($_POST['password']) ? 'Password is required.' : ''
            ];
        }
        else
        {
            $username = mysqli_escape_string($db_con->con, $_POST['username']);
            $password = mysqli_escape_string($db_con->con, $_POST['password']);

            $query = "SELECT * FROM `registration` WHERE `username` = '".$username."' AND `password` = '".$password."' ";
            $result = mysqli_query($db_con->con, $query);
            $return_rows = mysqli_num_rows($result);

            if($return_rows > 0)
            {
                foreach($result as $res)
                {
                    $_SESSION['name'] = $res['business_name'];
                    $_SESSION['user'] = $res['username'];
                    $_SESSION['pf'] = 'N/A';
                    $_SESSION['tp'] = 'Logged Out';
                }

                $exists = queryIfExists($db_con->con, randomNumber());

                if($exists)
                {
                    $success = insertLogsEntry(['an' => $_SESSION['name'], 'au' => $_SESSION['user'], 'pf' => 'N/A', 'tp' => 'Logged In'], $db_con->con);
                    if($success)
                    {
                        
                        $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";

                        $url = explode(':', $actual_link);

                        $sql = "SELECT MAX(id) as 'id' from `person` ";
                        $result = mysqli_query($db_con->con, $sql);
                        while($r = mysqli_fetch_array($result))
                        {
                            $maxID = $r['id'];
                        }

                        $login_data = [
                            'con' => true,
                            'success' => true,
                            'exists' => 1,
                            'username' => $_SESSION['user'],
                            'b_name' => $_SESSION['name'],
                            'password' => '',
                            'link' => $url[0] == 'http' ? 'https:'.$url[1] : 'https:'.$url[1],
                            'last_id' => $maxID
                        ];
                    }
                }
            }
            else
            {
                $login_data = [
                    'con' => true,
                    'success' => false,
                    'exists' => 0,
                    'all_msg' => "Unknown user or user doesn't exists."
                ];
            }
        }

        echo json_encode($login_data);
    }
}
else
{
    $login_data = [
        'con' => false,
        'success' => false,
        'exists' => 0,
        'all_msg' => ""
    ];

    echo json_encode($login_data);
}

function insertLogsEntry($data, $con)
{
    $query ="INSERT INTO `logs` (`id`, `account_name`, `admin_username`, `person_fullname`, `type`) VALUES ('".randomNumber()."', '".$data['an']."', '".$data['au']."', '".$data['pf']."', '".$data['tp']."')";
    $result = mysqli_query($con, $query);

    if ($result) {
        return true;
    }
}

function queryIfExists($con, $id)
{
    $query = "SELECT * FROM `logs` WHERE `id` = '".$id."' ";
    $result = mysqli_query($con, $query);
    $return_rows = mysqli_num_rows($result);

    if($return_rows == 0)
    {
        return true;
    }
    else
    {
        queryIfExists($con, randomNumber());
    }
}

function randomNumber()
{
    return rand(10000, 1000000);
}

