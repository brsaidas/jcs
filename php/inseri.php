<?php
    /*
    header("Access-Control-Allow-Origin: http://invensiblemoment.lovestoblog.com");
    header('content-type: application/json; charset=utf-8');
    */

    if (($_SERVER["REQUEST_METHOD"] == "POST") && ($_SERVER['HTTP_ORIGIN'] == "http://invensiblemoment.lovestoblog.com")) {
        
        //echo "Origen: " . $_SERVER['HTTP_ORIGIN'] . "<br />";
        
        $nick = $_POST["nick"];
        $score = $_POST["score"];

        //echo "NICK: " . $nick . "<br />";
        //echo "SCORE: " . $score . "<br/ >";

        $serverName = "";
        $userName = "";
        $password = "";
        $dbName = "";

        $conn = new mysqli($serverName, $userName, $password, $dbName);

        if ($conn->connect_error) {
            die("Conexao falhou: " . $conn->connect_error);
        }

        $sql = "SELECT * FROM Jogadores WHERE nick = '" . $nick . "'";

        $result = $conn->query($sql);

        if ($result->$num_rows == 0) {
            $sql = "INSERT INTO Jogadores (nick, score) VALUES ('" . $nick . "', '" . $score . "')";
            $conn->query($sql);
        }

        $conn->close();
    }
?>