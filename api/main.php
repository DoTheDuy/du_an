<?php
session_start();

require "../model/pdo.php";
require "../model/product.php";
require "../model/user.php";
require "../global.php";


if (isset($_GET['act'])) {

    $act = $_GET['act'];

    switch ($act) {
        case "listPro":
            if (isset($_POST['st'])) {
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
            if (isset($_POST['id'])) {
                $id = $_POST['id'];
                $pro = get_product($id);
                echo_json($pro);
            }
            break;

        case "addCart":
            if ($_POST['id']) {
                $cart = $_SESSION['cart'];
                $qty = $_POST['qty'];
                $id = $_POST['id'];
                $add = 1;
                foreach ($cart as $index => $item) {
                    if ($item['id'] == $id) {
                        $add = 0;
                        $_SESSION['cart'][$index]['qty'] += $qty;
                        break;
                    }
                }
                if ($add == 1) {
                    $sp = [
                        'id' => $id,
                        'qty' => $qty,
                    ];
                    $_SESSION['cart'][] = $sp;
                }
            }
            break;

        case "loadCart":
            $cart = $_SESSION['cart'];
            $listPro = [];
            foreach ($cart as $item) {
                $id = $item['id'];
                $qty = $item['qty'];
                $pro = get_product($id);
                $name = $pro['ten_san_pham'];
                $img = explode(", ", $pro['anh_san_pham'])[0];
                $price = ($pro['gia_khuyen_mai'] == -1) ? $pro['don_gia'] : $pro['gia_khuyen_mai'];
                $proLoad = [
                    'id' => $id,
                    "name" => $name,
                    'qty' => $qty,
                    'img' => $img,
                    'price' => $price,
                ];
                $listPro[] = $proLoad;
            }
            echo_json($listPro);
            break;

        case "removeCart":
            $cart = $_SESSION['cart'];
            $id = $_POST['id'];

            foreach ($cart as $index => $item) {
                if ($item['id'] == $id) {
                    unset($_SESSION['cart'][$index]);
                }
                break;
            }
            break;

        case "updateCart":
            $_id = $_POST['id'];
            $_qty = $_POST['qty'];
            $_id = explode(",", $_id);
            $_qty = explode(",", $_qty);
            $cart = [];
            $ms = [];
            for ($i = 0; $i < count($_id); $i++) {
                if ($_qty[$i] == 0) {
                    $ms = ['error', 'Có sản phẩn chưa có số lượng xin vui lòng bổ xung'];
                }
                $sp = [
                    'id' => $_id[$i],
                    'qty' => $_qty[$i],
                ];
                $cart[] = $sp;
            };
            if ($ms == []) {
                if ($_SESSION['cart'] == $cart) {
                    $ms = ['error', 'Giỏ hàng chưa có thay đổi'];
                } else {
                    $ms = ['success', 'Giỏ hàng đã được cập nhật'];
                    $_SESSION['cart'] = $cart;
                }
            }
            echo_json($ms);

            break;

        case "login":
            $email = $_POST['email'];
            $password = $_POST['password'];
            $user = get_user($email, $password);
            if($user != []) {
                $_SESSION['user'] = [
                    "id" => $user['ma_khach_hang'],
                    "name" => $user['ten_khach_hang'],
                    "email" => $user['email'],
                ];
                echo_json(true);
            } else {
                echo_json(false);
            }
            break;

        case "logout":
            unset($_SESSION['user']);
            break;

        case "register":
            $email = $_POST['email'];
            $password = $_POST['password'];
            echo_json(add_user($email, $password));
            break;

        case "checkPassword":
            $email = $_POST['email'];
            $password = $_POST['password'];
            $user = get_user($email, $password);
            if($user != []) {
                echo_json(true);
            } else {
                echo_json(false);
            }
            break;

        case "changeInfo":
            $password = $_POST['password'];
            $passwordNew = $_POST['passwordNew'];
            $id = $_SESSION['user']['id'];
            update_name_password_user($id, $name, $passwordNew);
            break;

        case "checkLogin":
            if(isset($_SESSION['user'])) echo_json(true);
            else echo_json(false);
            break;

        default:
    }
} else {
}
