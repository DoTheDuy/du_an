<?php
    session_start();

    require "../model/pdo.php";
    require "../model/product.php";
    require "../global.php";
    

    if(isset($_GET['act'])) {

        $act = $_GET['act'];

        switch ($act) {
            case "listPro":
                if(isset($_POST['st'])) {
                    $st = $_POST['st'];
                    $step = $_POST['step'];
                } else {
                    $st = 0;
                    $step = 8;
                }
                $listPro = get_list_product($st, $step);
                echo_json($listPro);
                break;
            
            case "getPro":
                if(isset($_POST['id'])) {
                    $id = $_POST['id'];
                    $pro = get_product($id);
                    echo_json($pro);
                } 
                break;
            
            default:
                
        }
    } else {
        
    }
