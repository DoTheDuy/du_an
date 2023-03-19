<?php
$imgdir = "admin/sanpham/img/";

function dd($x)
{
    echo "<pre>";
    print_r($x);
    echo "</pre>";
    die();
}

function echo_json($x)
{
    echo json_encode($x);
}

function dismount($object)
{
    $reflectionClass = new ReflectionClass(get_class($object));
    $array = array();
    foreach ($reflectionClass->getProperties() as $property) {
        $property->setAccessible(true);
        $array[$property->getName()] = $property->getValue($object);
        $property->setAccessible(false);
    }
    return $array;
}
