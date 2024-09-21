document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("userForm");

    form.addEventListener("submit", function (event) {
        var senha = document.getElementById('senha').value;
        var confirmaSenha = document.getElementById('confirmaSenha').value;

        // Verifica se as senhas são diferentes
        if (senha !== confirmaSenha) {
            event.preventDefault();  // Impede o envio do formulário se as senhas não coincidirem
            document.getElementById('confirmaSenha').classList.add('is-invalid');  // Adiciona a classe de erro visual
            confirmaSenha.setCustomValidity('As senhas não coincidem'); // Mensagem de erro
        } else {
            document.getElementById('confirmaSenha').classList.remove('is-invalid');  // Remove a classe de erro se as senhas forem iguais
            confirmaSenha.setCustomValidity(''); // Limpa a mensagem de erro
        }

        // Validação de campos obrigatórios
        if (form.checkValidity() === false) {
            event.preventDefault(); // Impede o envio se houver campos inválidos
            event.stopPropagation();
        } else {
            // Se todos os campos forem válidos
            alert("Cadastrado com sucesso!");
            form.submit(); // Envia o formulário
        }

        // Adiciona a classe de validação
        form.classList.add("was-validated");
    });
    document.addEventListener('DOMContentLoaded', function () {
        var form = document.getElementById('userForm');
        
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Impede o envio padrão do formulário
            
            // Cria uma instância de XMLHttpRequest
            var xhr = new XMLHttpRequest();
            xhr.open('POST', form.action, true);
            
            xhr.onload = function () {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    if (response.success) {
                        // Exibir modal de sucesso
                        var successModal = new bootstrap.Modal(document.getElementById('successModal'));
                        successModal.show();
    
                        // Redireciona após o fechamento do modal (se necessário)
                        document.getElementById('successModal').addEventListener('hidden.bs.modal', function () {
                            window.location.href = 'index.html'; // Redireciona para a página inicial, se necessário
                        });
                    }
                } else {
                    // Tratar erros
                    var errorResponse = JSON.parse(xhr.responseText);
                    alert(errorResponse.error);
                }
            };
    
            var formData = new FormData(form);
            xhr.send(formData);
        });
    });
    
});
