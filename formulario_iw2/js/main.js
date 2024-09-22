document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('userForm');
    var cepInput = document.getElementById('cep');
    var consultarCepButton = document.getElementById('consultarCep');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
    
        var form = event.target;
    
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }
    
        var xhr = new XMLHttpRequest();
        xhr.open('POST', form.action, true);
    
        xhr.onload = function () {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                console.log(response.message);
            }
        };
    
        var formData = new FormData(form);
        xhr.send(formData);
    });
    

    consultarCepButton.addEventListener('click', function () {
        var cep = cepInput.value.replace(/\D/g, ''); 

        if (cep.length === 8) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', `https://viacep.com.br/ws/${cep}/json/`, true);

            xhr.onload = function () {
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText);

                    if (!data.erro) {
                        document.getElementById('endereco').value = data.logradouro;
                        document.getElementById('bairro').value = data.bairro;
                        document.getElementById('cidade').value = data.localidade;
                        document.getElementById('estado').value = data.uf;
                    } else {
                        alert('CEP não encontrado');
                        clearAddressFields();
                    }
                } else {
                    alert('Erro ao consultar o CEP');
                }
            };

            xhr.send();
        } else {
            alert('CEP inválido');
            clearAddressFields();
        }
    })

})
