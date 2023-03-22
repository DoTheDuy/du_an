<?php
    session_start();
    require "model/pdo.php";
    require "model/product.php";
    require "model/user.php";
    require "global.php";

    require "view/header.php";
    if (!isset($_SESSION['cart'])) {
        $_SESSION['cart'] = [];
    }
    $user = [];
    if(isset($_GET['act'])) {

        $act = $_GET['act'];

        require "view/navbar.php";

        switch ($act) {
            case "shop-details":
                if(isset($_GET['id'])){
                    $id = $_GET['id'];
                    $pro = get_product($id);
                    require "view/shop-details.php";
                } else {
                    require "view/page-404.php";
                }
                
                break;
            
            case "shop-cart":
                require "view/shop-cart.php";
                break;
            
            case "shop-grid-left":
                require "view/shop-grid-left.php";
                break;
            
            case "page-my-account":
                
                if(isset($_SESSION['user']))require "view/page-my-account.php";
                else require "view/page-404.php";
                break;
            
            case "shop-checkout":
                if(isset($_SESSION['user'])) {
                    $user = get_user_id($user['id']);
                    $ship = "";
                    if(isset($_GET['ship'])) $ship = $_GET['ship'];
                    extract($user);
                    require "view/shop-checkout.php";
                }
                else require "view/page-404.php";
                break;
            
            case "page-login":
                if(isset($_SESSION['user'])) {
                    unset($_SESSION['user']);
                }
                require "view/page-login.php";
                break;
            
            default:
                require "view/page-404.php";
                break;
        }
    } else {
        require "view/navbar.php";
        require "view/home.php";
    }

    require "view/footer.php";
?>