document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('userForm');
    var cepInput = document.getElementById('cep');
    var consultarCepButton = document.getElementById('consultarCep');

    function clearAddressFields() {
        document.getElementById('endereco').value = '';
        document.getElementById('bairro').value = '';
        document.getElementById('cidade').value = '';
        document.getElementById('estado').value = '';
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Verifica se o formulário é válido
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        // Envio do formulário via AJAX
        var xhr = new XMLHttpRequest();
        xhr.open('POST', form.action, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                try {
                    var response = JSON.parse(xhr.responseText); // Parse do JSON
                    alert(response.message); 
                    if (response.message === 'Inscrição realizada com sucesso!') {
                        form.reset();
                        var successModal = new bootstrap.Modal(document.getElementById('successModal'));
                        successModal.show();
                    }
                } catch (e) {
                    // Exibe o erro de JSON no console
                    console.error("Erro ao parsear a resposta JSON:", e, xhr.responseText);
                    alert("Erro inesperado ao processar a resposta do servidor.");
                }
            } else {
                // Caso o status não seja 200, exibe a mensagem de erro
                console.error("Erro na requisição:", xhr.status, xhr.statusText);
                alert('Erro ao enviar o formulário: ' + xhr.statusText);
            }
        };

        xhr.onerror = function () {
            alert('Erro ao tentar enviar o formulário. Verifique sua conexão.');
        };

        xhr.send(new FormData(form));
    });

    consultarCepButton.addEventListener('click', function () {
        var cep = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => {
                    if (!response.ok) throw new Error('Erro ao consultar o CEP');
                    return response.json();
                })
                .then(data => {
                    if (!data.erro) {
                        document.getElementById('endereco').value = data.logradouro;
                        document.getElementById('bairro').value = data.bairro;
                        document.getElementById('cidade').value = data.localidade;
                        document.getElementById('estado').value = data.uf;
                    } else {
                        alert('CEP não encontrado');
                        clearAddressFields();
                    }
                })
                .catch(err => {
                    console.error("Erro ao consultar o CEP:", err);
                    alert('Erro ao consultar o CEP: ' + err.message);
                    clearAddressFields();
                });
        } else {
            alert('CEP inválido. O CEP deve ter 8 dígitos.');
            clearAddressFields();
        }
    });
});
