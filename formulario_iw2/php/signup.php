<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Coletar dados do formulário
    $nome = $_POST['nome'];
    $nascimento = $_POST['nascimento'];
    $email = $_POST['email'];
    $telefone = $_POST['telefone'];
    $cep = $_POST['cep'];
    $endereco = $_POST['endereco'];
    $cpf = $_POST['cpf'];
    $rg = $_POST['rg'];
    $senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);
    $assunto = $_POST['assunto'];
    $mensagem = $_POST['mensagem'];

    // Conectar ao banco de dados
    $servername = "localhost";
    $username = "root";
    $password = "";
    $name = "IPI_2";

    // Criar conexão
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verificar conexão
    if ($conn->connect_error) {
        die("Conexão falhou: " . $conn->connect_error);
    }

    // Preparar e vincular
    $stmt = $conn->prepare("INSERT INTO usuario (nome, nascimento, email, telefone, cep, endereco, cpf, rg, senha, assunto, mensagem) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssssssss", $nome, $nascimento, $email, $telefone, $cep, $endereco, $cpf, $rg, $senha, $assunto, $mensagem);

    // Executar
    if ($stmt->execute()) {
        echo "<script>
                var myModal = new bootstrap.Modal(document.getElementById('successModal'), {});
                myModal.show();
              </script>";
    } else {
        echo "Erro: " . $stmt->error;
    }

    // Fechar conexão
    $stmt->close();
    $conn->close();
}
?>
