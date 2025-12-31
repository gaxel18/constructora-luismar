<?php
header('Content-Type: application/json');
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = strip_tags(trim($_POST["nombre"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $telefono = strip_tags(trim($_POST["telefono"]));
    $proyecto = $_POST["proyecto"];
    $mensaje_adicional = strip_tags(trim($_POST["mensaje"]));

    $destinatario = "proyectosgax@gmail.com, ventas@constructoraluismar.com";
    $asunto = "NUEVA WEB: $proyecto";

    $headers = "From: Web Luis Mar <notificaciones@constructoraluismar.com>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $cuerpo = "Detalles de Cotización:\n\n";
    $cuerpo .= "Nombre: $nombre\n";
    $cuerpo .= "WhatsApp: $telefono\n";
    $cuerpo .= "Email: $email\n";
    $cuerpo .= "Proyecto: $proyecto\n";
    $cuerpo .= "Mensaje: $mensaje_adicional";

    if (mail($destinatario, $asunto, $cuerpo, $headers)) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error"]);
    }
}
?>