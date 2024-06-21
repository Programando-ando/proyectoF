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

$sql = "SELECT cliente, nombre, fecha, descripcion, salon FROM eventos";
$result = $conn->query($sql);

$eventos = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $eventos[] = $row;
    }
}

$conn->close();

echo json_encode($eventos);
?>