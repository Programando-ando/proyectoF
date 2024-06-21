<?php
include 'config.php';

// Obtener la fecha enviada desde el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $fecha = $_POST['fecha'];
  
  // Obtener eventos por mes y año
  $sql = "SELECT MONTH(date) as mes, COUNT(*) as cantidad_eventos FROM eventos WHERE YEAR(date) = YEAR('$fecha') GROUP BY MONTH(date)";
  
  $result = $cx->query($sql);
  
  if ($result) {
    $data = [];
    while ($row = $result->fetch_assoc()) {
      $mes = obtenerNombreMes($row['mes']); // Obtener nombre del mes
      $row['nombre_mes'] = $mes;
      $data[] = $row;
    }
    echo json_encode($data);
  } else {
    echo json_encode(['error' => 'Error al ejecutar la consulta: ' . $conn->error]);
  }
} else {
  echo json_encode(['error' => 'No se recibieron datos del formulario.']);
}

// Función para obtener el nombre del mes
function obtenerNombreMes($mesNumero) {
  $meses = array(1 => 'Enero', 2 => 'Febrero', 3 => 'Marzo', 4 => 'Abril', 5 => 'Mayo', 6 => 'Junio', 7 => 'Julio', 8 => 'Agosto', 9 => 'Septiembre', 10 => 'Octubre', 11 => 'Noviembre', 12 => 'Diciembre');
  return $meses[(int)$mesNumero];
}

$cx->close();
?>