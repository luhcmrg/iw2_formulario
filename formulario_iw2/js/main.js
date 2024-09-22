document.addEventListener('DOMContentLoaded'), function () {
    var form = document.getElementById('userForm');
    var cepInput = document.getElementById('cep');
    var consultarCepButton = document.getElementById('consultarCep');

    form.addEventListener('submit', function (event) {
       
        if (!form.checkValidity()) {
            event.preventDefault(); 
            event.stopPropagation(); 
        } else {
            form.classList.add('was-validated'); 


            event.preventDefault(); 
            var xhr = new XMLHttpRequest();
            xhr.open('POST', form.action, true);

            xhr.onload = function () {
                if (xhr.status === 200) {
                    var successModal = new bootstrap.Modal(document.getElementById('successModal'));
                    successModal.show();

                    document.getElementById('successModal').addEventListener('hidden.bs.modal', function () {
                        window.location.href = 'index.html'; 
                    });
                }
            };

            var formData = new FormData(form);
            xhr.send(formData);
        }
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
                        document.getElementById('logradouro').value = data.logradouro;
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

}
