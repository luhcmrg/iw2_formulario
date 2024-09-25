<?php 
// Habilitar exibição de erros
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Conectar ao banco de dados
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "IPI_2";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Coletar dados do formulário
$nome = $_POST['nome'];
$nascimento = $_POST['nascimento'];
$email = $_POST['email'];
$telefone = $_POST['telefone'];
$cep = $_POST['cep'];
$cpf = $_POST['cpf'];
$rg = $_POST['rg'];
$senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);
$assunto = $_POST['assunto'];
$mensagem = $_POST['mensagem'];

// Verificar se os campos obrigatórios estão preenchidos
if (empty($nome) || empty($nascimento) || empty($email) || empty($telefone) || empty($cep) || empty($cpf) || empty($rg) || empty($senha) || empty($assunto) || empty($mensagem)) {
    http_response_code(400);
    echo json_encode(['error' => 'Todos os campos são obrigatórios.']);
    exit();
}

// Verificar se o e-mail já existe
$stmt = $conn->prepare("SELECT id FROM usuario WHERE email = ?");
if (!$stmt) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao preparar a consulta: ' . $conn->error]);
    exit();
}

$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    http_response_code(409);
    echo json_encode(['error' => 'Este e-mail já está cadastrado.']);
} else {
    // Inserir dados na tabela
    $stmt = $conn->prepare("INSERT INTO usuario (nome, nascimento, email, telefone, cep, cpf, rg, senha, assunto, mensagem) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    if (!$stmt) {
        http_response_code(500);
        echo json_encode(['error' => 'Erro ao preparar a consulta: ' . $conn->error]);
        exit();
    }

    $stmt->bind_param("sssssssssss", $nome, $nascimento, $email, $telefone, $cep, $cpf, $rg, $senha, $assunto, $mensagem);

    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(['success' => 'Cadastro realizado com sucesso.']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Erro ao inserir os dados: ' . $stmt->error]);
    }
}

// Fechar conexão
$stmt->close();
$conn->close();
?>
