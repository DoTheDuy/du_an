<?php
    $imgdir = "admin/sanpham/img/";

    function dd($x) {
        echo "<pre>";
        print_r($x);
        echo "</pre>";
        die();
    }

    function echo_json($x) {
        echo json_encode($x);
    }
?>