document.addEventListener('DOMContentLoaded', function () {
    // Obtém os elementos de entrada
    var telefone = document.getElementById('telefone');
    var cep = document.getElementById('cep');
    var cpf = document.getElementById('cpf');
    var rg = document.getElementById('rg');

    // Máscara para o telefone
    telefone.addEventListener('input', function () {
        this.value = this.value
            .replace(/\D/g, '')   
            .replace(/^(\d{2})(\d)/, '($1) $2') 
            .replace(/(\d{5})(\d)/, '$1-$2') 
            .replace(/(-\d{4})\d+?$/, '$1'); 
    });

    // Máscara para o CEP
    cep.addEventListener('input', function () {
        this.value = this.value
            .replace(/\D/g, '')      
            .replace(/^(\d{5})(\d)/, '$1-$2') 
            .replace(/(-\d{3})\d+?$/, '$1'); 
    });

    // Máscara para o CPF
    cpf.addEventListener('input', function () {
        this.value = this.value
            .replace(/\D/g, '')         
            .replace(/^(\d{3})(\d)/, '$1.$2') 
            .replace(/^(\d{3}\.\d{3})(\d)/, '$1.$2') 
            .replace(/^(\d{3}\.\d{3}\.\d{3})(\d)/, '$1-$2') /
            .replace(/(-\d{2})\d+?$/, '$1'); 
    });

    // Máscara para o RG
    rg.addEventListener('input', function () {
        this.value = this.value
            .replace(/\D/g, '')         
            .replace(/^(\d{2})(\d{2})/, '$1.$2') /
            .replace(/^(\d{2}\.\d{3})(\d{2})/, '$1.$2') 
            .replace(/^(\d{2}\.\d{3}\.\d{3})(\d{1,2})/, '$1-$2') 
            .slice(0, 12);               
    });

    // Adiciona um listener ao botão de consulta de CEP
    const consultarCepButton = document.getElementById('consultarCep');
    const cepInput = document.getElementById('cep');

    if (consultarCepButton && cepInput) {
        consultarCepButton.addEventListener('click', function () {
            const cep = cepInput.value.replace(/\D/g, '');

            // Verifica se o CEP tem o tamanho correto
            if (cep.length === 8) {
                // Consulta a API do ViaCEP
                fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.erro) {
                            alert('CEP não encontrado.');
                            return;
                        }

                        // Preenche os campos com os dados retornados
                        document.getElementById('endereco').value = data.logradouro || '';
                        document.getElementById('bairro').value = data.bairro || '';
                        document.getElementById('cidade').value = data.localidade || '';
                        document.getElementById('estado').value = data.uf || '';
                    })
                    .catch(error => {
                        console.error('Erro ao consultar o CEP:', error);
                        alert('Erro ao consultar o CEP.');
                    });
            } else {
                alert('Por favor, insira um CEP válido com 8 dígitos.');
            }
        });
    }
});
