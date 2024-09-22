document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("userForm");

    form.addEventListener("submit", function (event) {
        var senha = document.getElementById('senha').value;
        var confirmaSenha = document.getElementById('confirmaSenha').value;

        if (senha !== confirmaSenha) {
            event.preventDefault();  
            document.getElementById('confirmaSenha').classList.add('is-invalid');  
            confirmaSenha.setCustomValidity('As senhas não coincidem');
        } else {
            document.getElementById('confirmaSenha').classList.remove('is-invalid');
            confirmaSenha.setCustomValidity(''); 
        }

        if (form.checkValidity() === false) {
            event.preventDefault(); 
            event.stopPropagation();
        } else {

            alert("Cadastrado com sucesso!");
            form.submit(); 
        }

        form.classList.add("was-validated");
    });
    document.addEventListener('DOMContentLoaded', function () {
        var form = document.getElementById('userForm');
        
        form.addEventListener('submit', function (event) {
            event.preventDefault(); 
            
            var xhr = new XMLHttpRequest();
            xhr.open('POST', form.action, true);
            
            xhr.onload = function () {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    if (response.success) {
                        var successModal = new bootstrap.Modal(document.getElementById('successModal'));
                        successModal.show();
    
                        document.getElementById('successModal').addEventListener('hidden.bs.modal', function () {
                            window.location.href = 'index.html'; 
                        });
                    }
                } else {
                    var errorResponse = JSON.parse(xhr.responseText);
                    alert(errorResponse.error);
                }
            };
    
            var formData = new FormData(form);
            xhr.send(formData);
        });
    });
    
});
