<?php
    session_start();
    require "model/pdo.php";
    require "model/product.php";
    require "global.php";

    require "view/header.php";
    if (!isset($_SESSION['cart'])) {
        $_SESSION['cart'] = [];
    }

    if(isset($_GET['act'])) {

        $act = $_GET['act'];

        require "view/navbar.php";

        switch ($act) {
            case "shop-details":
                if(isset($_GET['id'])){
                    $id = $_GET['id'];
                    $pro = get_product($id);
                }
                require "view/shop-details.php";
                break;
            
            case "shop-cart":
                require "view/shop-cart.php";
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