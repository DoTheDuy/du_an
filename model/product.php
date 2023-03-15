<?php

function get_list_product($st, $step)
{
    $sql = "SELECT * FROM san_pham ORDER BY san_pham.ma_san_pham DESC LIMIT $st,$step";
    $listsanpham = pdo_query($sql);
    return $listsanpham;
}

function get_product($id)
{
    $sql = "SELECT * FROM san_pham WHERE san_pham.ma_san_pham = $id";
    $pro = pdo_query_one($sql);
    return $pro;
}


