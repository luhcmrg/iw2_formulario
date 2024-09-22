<?php
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'ipi_2'; 

$conn = mysqli_connect($host, $user, $password, $database);

if (!$conn) {
    die("Conexão falhou: " . mysqli_connect_error());
}
