document.addEventListener('DOMContentLoaded', function () {
    
    function applyMask(input, maskFunction) {
        input.addEventListener('input', function () {
            let value = this.value.replace(/\D/g, '');
            let formattedValue = maskFunction(value);
            this.value = formattedValue;
        });
    }

    applyMask(document.getElementById('telefone'), function (value) {
        return value
            .replace(/^(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1');
    });

    applyMask(document.getElementById('cep'), function (value) {
        return value.replace(/^(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{3})\d+?$/, '$1');
    });

    applyMask(document.getElementById('cpf'), function (value) {
        return value
            .replace(/^(\d{3})(\d)/, '$1.$2')
            .replace(/^(\d{3}\.\d{3})(\d)/, '$1.$2')
            .replace(/^(\d{3}\.\d{3}\.\d{3})(\d)/, '$1-$2');
    });

    applyMask(document.getElementById('rg'), function (value) {
        return value
            .replace(/^(\d{2})(\d{2})/, '$1.$2')
            .replace(/^(\d{2}\.\d{3})(\d{2})/, '$1.$2')
            .replace(/^(\d{2}\.\d{3}\.\d{3})(\d{1,2})/, '$1-$2')
            .slice(0, 12);
    });
});
