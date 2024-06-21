<?php
header('Content-Type: application/json');

// Aquí deberías realizar la conexión a tu base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "eventos_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT nombre FROM clientes";
$result = $conn->query($sql);

$clientes = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $clientes[] = $row['nombre'];
    }
}

$conn->close();

echo json_encode($clientes);
?>