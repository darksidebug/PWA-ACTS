<?php
ini_set('display_errors', 0);
include '../checker/connection-checker.php';

class DBConnection{

    public $con;
    public $dbserver="localhost";
    public $dbusername="root";
    public $dbpass="darksidebug_09";
    public $dbname="southern_tracing_covid";
    public $con_err = "<div style='margin-top: 10vh; border: 1px solid #f87373; padding: 15px; border-radius: 5px; margin-left: 1rem; margin-right: 1rem;'>
                        <h3 style='letter-spacing: 0.08rem; color: #302f2f; font-family: Segoe UI, Century Gothic;'>500 | INTERNAL SERVER ERROR</h3>
                        <h5 style='letter-spacing: 0.08rem; color: #302f2f; font-family: Segoe UI, Century Gothic;'>ERROR: Failed to connect to database.</h5>
                    </div>";

    public function __construct()
    {
        $this->mysqlConnection();
    }

    public function mysqlConnection()
    {
        $this->con = new mysqli($this->dbserver, $this->dbusername, $this->dbpass, $this->dbname);

        if($this->con->connect_error)
        {
            return ['con' => false, 'con_error'=> $this->con_err];
        }
        else
        {
            return ['con' => true, 'con_error'=> null];
        }
    }

    public function sqliteConnection()
    {}
}

$db_con = new DBConnection();