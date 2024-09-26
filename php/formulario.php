<?php
include 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nome = $_POST['nome'];
    $nascimento = $_POST['nascimento'];
    $cpf = $_POST['cpf'];
    $rg = $_POST['rg'];
    $email = $_POST['email'];
    $telefone = $_POST['telefone'];
    $cep = $_POST['cep'];
    $endereco = $_POST['endereco'];
    $bairro = $_POST['bairro'];
    $cidade = $_POST['cidade'];
    $estado = $_POST['estado'];
    $senha = password_hash($_POST['senha'], PASSWORD_BCRYPT);
    $assunto = $_POST['assunto'];
    $mensagem = $_POST['mensagem'];

    $sql = "INSERT INTO usuarios (nome, nascimento, cpf, rg, email, telefone, cep, endereco, bairro, cidade, estado, senha, assunto, mensagem)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ssssssssssssss', $nome, $nascimento, $cpf, $rg, $email, $telefone, $cep, $endereco, $bairro, $cidade, $estado, $senha, $assunto, $mensagem);

    if ($stmt->execute()) {
        echo json_encode(['message' => 'Inscrição realizada com sucesso!']);
    } else {
        echo json_encode(['message' => 'Erro ao cadastrar: ' . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
}
?>
