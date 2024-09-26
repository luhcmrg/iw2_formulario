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

    consultarCepButton.addEventListener('click', function () {
        var cep = cepInput.value.replace(/\D/g, ''); // Remover caracteres não numéricos
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
                    console.error(err);
                    alert('Erro ao consultar o CEP: ' + err.message);
                    clearAddressFields();
                });
        } else {
            alert('CEP inválido. O CEP deve ter 8 dígitos.');
            clearAddressFields();
        }
    });
});
