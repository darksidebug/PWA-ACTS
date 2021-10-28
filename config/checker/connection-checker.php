<?php

class ConnectionChecker{
    
    // public $isOnline = false;

    // public function __construct()
    // {
    //     $connected = @fsockopen("https://www.google.com/", 80); 
    //     if ($connected){
    //         $this->isOnline = true;
    //         fclose($connected);
    //     }
        
    //     $this->isOnline = false;
    // }

    public static function is_connected()
    {
        $is_conn = false;

        $connected = @fsockopen("https://www.google.com/", 80); 
                                            //website, port  (try 80 or 443)
        if ($connected){
            $is_conn = true; 
            fclose($connected);
        }else{
            $is_conn = false;
        }

        return $is_conn;
    }
}