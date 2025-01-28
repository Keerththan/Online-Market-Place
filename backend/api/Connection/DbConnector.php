<?php
class DbConnector{
    private $user = "root";
    private $host = "localhost";
    private $pwd = "";
    private $dbname = "elitez";
    private $pdo;

    public function getConnection(){
        try{
            $this->pdo = new PDO("mysql:host=$this->host;dbname=$this->dbname",$this->user , $this->pwd);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $this->pdo;
        }catch(PDOException $e){
            echo "Connection failed with  class :".$e->getMessage();
        }
       
        }
}

?>