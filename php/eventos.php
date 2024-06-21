<?php
include 'config.php';

function respondWithJson($data, $error = false) {
    header('Content-Type: application/json');
    if ($error) {
        http_response_code(400);
    }
    echo json_encode($data);
    exit;
}

function handlePostRequest() {
    global $cx;
    $action = $_POST['action'] ?? '';

    if ($action === 'agregar_evento') {
        $name = mysqli_real_escape_string($cx, $_POST['name']);
        $date = mysqli_real_escape_string($cx, $_POST['date']);
        $description = mysqli_real_escape_string($cx, $_POST['description']);
        $direccion = mysqli_real_escape_string($cx, $_POST['direccion']);
        $salon = mysqli_real_escape_string($cx, $_POST['salon']);

        $sql = "INSERT INTO eventos (name, date, description, direccion, salon) VALUES ('$name', '$date', '$description', '$direccion', '$salon')";
        if (mysqli_query($cx, $sql)) {
            respondWithJson(["message" => "Evento añadido exitosamente."]);
        } else {
            respondWithJson(["message" => "Error: " . mysqli_error($cx)], true);
        }
    } elseif ($action === 'agregar_complemento') {
        $complemento = mysqli_real_escape_string($cx, $_POST['complemento']);
        $cantidad = mysqli_real_escape_string($cx, $_POST['cant']);

        $sql = "INSERT INTO complementos (complemento, cant) VALUES ('$complemento', '$cantidad')";
        if (mysqli_query($cx, $sql)) {
            respondWithJson(["message" => "Complemento añadido exitosamente."]);
        } else {
            respondWithJson(["message" => "Error: " . mysqli_error($cx)], true);
        }
    } elseif ($action === 'agregar_servicio') {
        $nombre = mysqli_real_escape_string($cx, $_POST['nombre']);
        $cantidad = mysqli_real_escape_string($cx, $_POST['cantidad']);

        $sql = "INSERT INTO servicios (nombre, cantidad) VALUES ('$nombre', '$cantidad')";
        if (mysqli_query($cx, $sql)) {
            respondWithJson(["message" => "Servicio añadido exitosamente."]);
        } else {
            respondWithJson(["message" => "Error: " . mysqli_error($cx)], true);
        }
    }
}

function handleGetRequest() {
    global $cx;
    $action = $_GET['action'] ?? '';

    if ($action === 'obtener_eventos') {
        $result = mysqli_query($cx, "SELECT * FROM eventos");
        $events = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $events[] = $row;
        }
        respondWithJson($events);
    } elseif ($action === 'obtener_complementos') {
        $result = mysqli_query($cx, "SELECT * FROM complementos");
        $complementos = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $complementos[] = $row;
        }
        respondWithJson($complementos);
    } elseif ($action === 'obtener_servicios') {
        $result = mysqli_query($cx, "SELECT * FROM servicios");
        $servicios = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $servicios[] = $row;
        }
        respondWithJson($servicios);
    }
}

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'POST') {
    handlePostRequest();
} elseif ($method === 'GET') {
    handleGetRequest();
} else {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed"]);
}
?>
