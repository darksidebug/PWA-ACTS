<?php

class FlashUser {

    public static function set($session) {
        if (!isset($_SESSION['flash'])) {
            $_SESSION['flash'] = array();
        }

        $_SESSION['flash']['username'] = $session['username'];
        $_SESSION['flash']['password'] = $session['password'];
    }

    // public static function username(){
    //     if (!isset($_SESSION['flash'])) {
    //         return null;
    //     }

    //     $session = $_SESSION['flash']['username'];
    //     // unset($_SESSION['flash']['username']);
    //     return $session;
    // }

    // public static function password(){
    //     if (!isset($_SESSION['flash'])) {
    //         return null;
    //     }

    //     $session = $_SESSION['flash']['password'];
    //     // unset($_SESSION['flash']['password']);
    //     return $session;
    // }
}

// $flash = new FlashUser();