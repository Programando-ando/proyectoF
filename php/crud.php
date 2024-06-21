<?php
header('Content-Type: application/json');
include 'config.php';

$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';

switch ($action) {
    case 'add':
        $nombre = $_POST['nombre'];
        $correo = $_POST['correo'];
        $telefono = $_POST['telefono'];
        $query = "INSERT INTO cliente VALUES (null,'$nombre', '$correo', '$telefono')";
        if (mysqli_query($cx, $query)) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => mysqli_error($conn)]);
        }
        break;

    case 'edit':
        $id = $_POST['id'];
        $nombre = $_POST['nombre'];
        $correo = $_POST['correo'];
        $telefono = $_POST['telefono'];
        $query = "UPDATE cliente SET nombre = '$nombre', correo = '$correo', telefono = '$telefono' WHERE id = $id";
        if (mysqli_query($cx, $query)) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => mysqli_error($conn)]);
        }
        break;

    case 'delete':
        $id = $_POST['id'];
        $query = "DELETE FROM cliente WHERE id = $id";
        if (mysqli_query($cx, $query)) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => mysqli_error($conn)]);
        }
        break;

    case 'list':
        $query = "SELECT * FROM cliente";
        $result = mysqli_query($cx, $query);
        $clientes = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $clientes[] = $row;
        }
        echo json_encode($clientes);
        break;

    case 'get':
        $id = $_GET['id'];
        $query = "SELECT * FROM cliente WHERE id = $id";
        $result = mysqli_query($cx, $query);
        echo json_encode(mysqli_fetch_assoc($result));
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Acción no válida']);
}
?>