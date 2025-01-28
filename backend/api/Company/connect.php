<!-- 

class DbConnector {
    private $hostname = "localhost";
    private $dbname = "shopping";
    private $dbusername = "root";
    private $dbpassword = "";

    public function getConnection() {
        $dsn = "mysql:host=".$this->hostname.";dbname=".$this->dbname;
        
        try {
            $conn = new PDO($dsn, $this->dbusername, $this->dbpassword);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Set error mode to exceptions
            return $conn;
        } catch (PDOException $e) {
            die("Connection failed: " . $e->getMessage());
        }
    }
} -->
