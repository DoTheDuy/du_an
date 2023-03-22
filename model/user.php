<?php
    function get_user($email, $password) {
        $sql = "SELECT * FROM khach_hang WHERE khach_hang.email = '$email' AND khach_hang.mat_khau = '$password'";
        $user = pdo_query_one($sql);
        return $user;
    }

    function get_user_id($id) {
        $sql = "SELECT * FROM khach_hang WHERE khach_hang.ma_khach_hang = $id";
        $user = pdo_query_one($sql);
        return $user;
    }

    function add_user($email, $password) {
        $sql = "SELECT * FROM khach_hang WHERE khach_hang.email = '$email'";
        $user = pdo_query_one($sql);
        if($user == []) {
            $sql = "INSERT INTO `duan`.`khach_hang` (`email`, `mat_khau`) VALUES ('$email', '$password');";
            pdo_execute($sql);
            return true;
        } else {
            return false;
        }
    }

    function update_name_password_user($id, $name, $password) {
        $sql = "UPDATE `duan`.`khach_hang` SET `ten_khach_hang` = '$name', `mat_khau` = '$password' WHERE `ma_khach_hang` = $id";
        pdo_execute($sql);
    }
