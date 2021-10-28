<?php

class FileHandler{

    public $fileLocation = '/config/database';

    public static function fileRead($filename)
    {
        $file = fopen($filename, 'r');
        return $file;
    }

    public static function fileOpen($filename)
    {
        
        $fp = fopen($filename, 'w');
        return $fp;
    }

    public static function fileWrite($file, $txt)
    {
        fwrite($file, $txt);
    }

    public static function fileClose($file)
    {
        fclose($file);
    }
}

$fileHandler = new FileHandler();