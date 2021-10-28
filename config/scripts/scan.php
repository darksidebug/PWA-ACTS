<?php

session_start();
require '../connection/database-connection.php';

$scan_data = [];
$data = [];
$entry = false;
$row_entry = false;
$type = '';

if(isset($_POST['scan_attempt']) && $_POST['scan_attempt'] == 1)
{
    $qrcode = mysqli_escape_string($db_con->con, $_POST['qrcode']);

    $query = "SELECT * FROM `person` LEFT JOIN `vaccination_statuses` ON `person`.`id` = `vaccination_statuses`.`id` WHERE `qr_code` = '".$qrcode."' ";
    $result = mysqli_query($db_con->con, $query);
    $return_rows = mysqli_num_rows($result);

    if($return_rows > 0)
    {
        foreach($result as $res)
        {
            if($res['is_flagged'] == 1)
            {
                $scan_data = [
                    'scan' => true,
                    'entry' => false,
                    'exists' => 1,
                    'fullname' => ucwords($res['first_name'].' '.(isset($res['middle_name']) ? trim($res['middle_name']) : '').' '.$res['last_name']),
                    'status' => ($res['status'] == 1 ? 'partially vaccinated' : ($res['status'] == 2 ? 'fully vaccinated' : '')),
                    'vaccine' => (stringHelper($res['first_dose_name']) == stringHelper($res['second_dose_name']) ? stringHelper($res['first_dose_name']) : stringHelper($res['first_dose_name']).' & '.stringHelper($res['first_dose_name'])),
                    'msg' => $res['flag_message'],
                    'flag' => $res['is_flagged'],
                ];
            }
            else
            {         
                if($_POST['checked'] == 1)
                {
                     $type = 'Enter';
                }
                else
                {
                    $type = 'Exit';
                }
                
                $success = insertExitEntry(['hn' => $res['household_number'],
                             'fn' => $res['first_name'],
                             'mn' => $res['middle_name'],
                             'ln' => $res['last_name'],
                             'con' => $res['contact_number'],
                             'ad' => $res['address'],
                             'vi' => $_SESSION['name'],
                             'tp' => $type
                            ], $db_con->con);
                if($success)
                {
                    $scan_data = [
                        'scan' => true,
                        'entry' => true,
                        'exists' => 1,
                        'fullname' => ucwords($res['first_name'].' '.(isset($res['middle_name']) ? trim($res['middle_name']) : '').' '.$res['last_name']),
                        'status' => ($res['status'] == 1 ? 'partially vaccinated' : ($res['status'] == 2 ? 'fully vaccinated' : 'Unvaccinated')),
                        'vaccine' => (stringHelper($res['first_dose_name']) == stringHelper($res['second_dose_name']) ? stringHelper($res['first_dose_name']) : stringHelper($res['first_dose_name']).' & '.stringHelper($res['first_dose_name'])),
                        'msg' => $res['flag_message'],
                        'flag' => $res['is_flagged'],
                    ];
                }
            }
        }
    }
    else
    {
        $scan_data = [
            'scan' => false,
            'entry' => false,
            'exists' => 0,
            'fullname' => '',
            'msg' => '',
            'flag' => 0
        ];
    }

    echo json_encode($scan_data);
}

function stringHelper($data)
{
    $abb = [
        'astra' => 'AstraZeneca',
        'jj' => 'Johnson & Johnson',
        'sinovac' => 'Sinovac',
        'pfizer' => 'Pfizer'
    ];

    return $abb[$data];
}

function insertExitEntry($data, $con)
{
    $query ="INSERT INTO `entry` (`household_number`, `first_name`, `middle_name`, `last_name`, `contact_number`, `address`, `visited`, `type`, `entry_date`, `entry_added`) 
            VALUES('".$data['hn']."', '".$data['fn']."', '".$data['mn']."', '".$data['ln']."', '".$data['con']."', '".$data['ad']."', '".$data['vi']."', '".$data['tp']."', '".date("Y-m-d H:i:s")."', '".date("Y-m-d H:i:s")."')";
    $result = mysqli_query($con, $query);

    if ($result) {
        return true;
    }
}