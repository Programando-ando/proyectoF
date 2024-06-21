<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$cliente = $data['cliente'];
$nombre = $data['nombre'];
$fecha = $data['fecha'];
$descripcion = $data['descripcion'];
$salon = $data['salon'];

// Aquí deberías realizar la conexión a tu base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "eventos_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$sql = "INSERT INTO eventos (cliente, nombre, fecha, descripcion, salon) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $cliente, $nombre, $fecha, $descripcion, $salon);

$response = [];
if ($stmt->execute()) {
    $response['status'] = 'success';
    $response['message'] = 'Evento añadido correctamente';
} else {
    $response['status'] = 'error';
    $response['message'] = 'Error al añadir el evento';
}

$stmt->close();
$conn->close();

echo json_encode($response);
?>