<?php 
$target_dir ="uploads/";
$target_file=$target_dir.basename($_FILES["fileToUpload"]["name"]);
$uploadOK=1;
$imageFiletype=strtolower(pathinfo($target_file, PATHINFO_ESTENSION));
//Verifica si el archivo es una imagen real o imagen falsa
if (isset($_POST["submit"])) {
    $check =getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if ($check !== false) {
        echo "El archivo es una imagen -" . $check["mime"] . ".";
        $uploadOK=1;
        
    }else{
        echo "El archivo no es una imagen.";
        $uploadOK=0;
    }
}
//verificar si el archivo ya exixte
if (file_exists($target_file)) {
    echo "Lo siento el archivo ya exixte"
    $uploadOK=0;
}
//verifica el tamaño del archivo
if ($_FILES["fileToUpload"]["size"]>500000) {
    echo "Lo siento tu Archivo es demasiado Grande";
    $uploadOK=0;
}
//permitir ciertos formatos de archivo
if ($imageFiletype !="jpg" && $imageFiletype !="png" && !=$imageFiletype !="jpeg" && $imageFiletype!="gif") {
    echo "Lo siento solo se aceptan archivos JPG, JPEG, PNG, GIF"
    $uploadOK=0;
}
// verificar si $uploadOK es = por algun error
if ($uploadOK == 0) {
    echo "Lo siento tu archivo no fue subido";
    // si todo esta bien intenta subir el archivo
}else{
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        echo "El archivo ". htmlspecialchars( basename ( $_FILES["fileToUpload"]["name"])). "ha sido subido exitosamente";
    } else {
        echo "Lo siento, hubo un error subiendo tu archivo";
    }
    
}
?>