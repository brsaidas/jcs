<?php
    /*
    header("Access-Control-Allow-Headers: Authorization, Content-Type");
    header("Access-Control-Allow-Origin: *");
    header('content-type: application/json; charset=utf-8');
    */

    if (($_SERVER["REQUEST_METHOD"] == "POST") && ($_SERVER['HTTP_ORIGIN'] == "http://invensiblemoment.lovestoblog.com")) {
        $serverName = "";
        $userName = "";
        $password = "";
        $dbName = "";

        $conn = new mysqli($serverName, $userName, $password, $dbName);

        if ($conn->connect_error) {
            die("Conexao falhou: " . $conn->connect_error);
        }

        $sql = "SELECT * FROM Rooms";
        
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $json = array();

            while($row = $result->fetch_assoc()) {
                array_push($json, $row);
            }

            echo json_encode($json);
        } else {
            echo "0 resultados";
        }

        $conn->close();
    }
?>