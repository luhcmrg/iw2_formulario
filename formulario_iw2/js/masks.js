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
            .replace(/^(\d{3}\.\d{3}\.\d{3})(\d)/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1'); 
    });

    // Máscara para o RG
    rg.addEventListener('input', function () {
        this.value = this.value
            .replace(/\D/g, '')         
            .replace(/^(\d{2})(\d{2})/, '$1.$2')
            .replace(/^(\d{2}\.\d{3})(\d{2})/, '$1.$2') 
            .replace(/^(\d{2}\.\d{3}\.\d{3})(\d{1,2})/, '$1-$2') 
            .slice(0, 12);               
    });
});
