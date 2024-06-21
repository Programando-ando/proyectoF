<?php
include("../../php/config.php"); 

$query = "SELECT * FROM eventos";
$result = $cx->query($query);

if ($result->num_rows > 0) {
    $listaeventos = $result->fetch_all(MYSQLI_ASSOC);
} else {
    $listaeventos = [];
}
?>

<?php
ob_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PDF EVENTOS</title>
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">

</head>
<body class="text-center">
    <h1>REPORTE DE EVENTOS</h1>
<table class="table w-75 m-auto mt-4 table-striped-columns table-dark table-bordered border-primary text-center">
    <tr>
        <td>ID</td>
        <td>Nombre de Evento</td>
        <td>Fecha del evento</td>
        <td>Descripcion</td>
        <td>Direccion</td>
        <td>Salon</td>
    </tr>
    <?php foreach($listaeventos as $item): ?>
    <tr>
        <td><?php echo $item['id']; ?></td>
        <td><?php echo $item['name']; ?></td>
        <td><?php echo $item['date']; ?></td>
        <td><?php echo $item['description']; ?></td>
        <td><?php echo $item['direccion']; ?></td>
        <td><?php echo $item['salon']; ?></td>

    </tr>
    <?php endforeach; ?>
</table>
    
</body>
</html>


<?php
$html=ob_get_clean();
//echo $html;
require_once '../libreria/dompdf/autoload.inc.php';
use Dompdf\Dompdf;
$dompdf=new Dompdf();

$options=$dompdf->getOptions();
$options->set(array('isRemoteEnabled'=>true));
$dompdf->setOptions($options);

//$dompdf->loadHtml("HOLA YERSHOP");
$dompdf->loadHtml($html);

$dompdf->setPaper('letter');
//$dompdf->setPaper('A4','landscape');
$dompdf->render();
$dompdf->stream("archivo_.pdf", array("Attachment"=>false));//VISUALIZAR PDF CUANDO ESTA EN FALSE
?>

