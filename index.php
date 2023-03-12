<?php
    session_start();

    require "view/header.php";

    if(isset($_GET['act'])) {

        $act = $_GET['act'];

        require "view/navbar.php";

        switch ($act) {
            case "shop-details":
                require "view/shop-details.php";
                break;
            default:
                require "view/home.php";
                break;
        }
    } else {
        require "view/navbar.php";
        require "view/home.php";
    }

    require "view/footer.php";
?>