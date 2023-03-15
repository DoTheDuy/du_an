<?php

function user_insert($password, $user_name, $email, $role)
{
    $sql = "insert into customer values(null,'$user_name','$password','','$email','','','$role')";
    pdo_execute($sql);
}

function insert_cus($user_name, $pass, $full_name, $email, $phone, $address, $role)
{
    $sql = "insert into customer values(null,'$user_name','$pass','$full_name','$email','$phone','$address','$role')";
    pdo_execute($sql);
}

function update_cus($id, $user_name, $pass, $full_name, $email, $phone, $address, $role)
{
    $sql = "update customer set user_name ='$user_name',password ='$pass',full_name='$full_name',
                                    email='$email',phone_number='$phone',address='$address',role='$role' 
                                    where id_user='$id' ";
    pdo_execute($sql);
}

function delete_cus($id)
{
    $sql = "delete from customer where id_user =" . $id;
    pdo_execute($sql);
}

function user_login($user_name, $password)
{
    $sql = "select * from customer where user_name='$user_name' and password='$password'";
    $tk = pdo_query_one($sql);
    return $tk;
}

function user_all($kyw = "", $id = 0)
{
    $sql = "select * from customer where 1";
    if ($kyw != "") {
        $sql .= " and user_name like '%" . $kyw . "%' or id_user like '%" . $kyw . "%'";
    }
    if ($id > 0) {
        $sql .= " and role = '" . $id . "'";
    }
    $sql .= " order by id_user desc";
    $list_cus = pdo_query($sql);
    return $list_cus;
}

function loadone_cus($id)
{
    $sql = "select * from customer where id_user=" . $id;
    $user = pdo_query_one($sql);
    return $user;
}

