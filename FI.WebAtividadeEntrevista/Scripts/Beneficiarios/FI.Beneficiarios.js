﻿$(document).ready(function () {
    Events();
})

function Events() {
    // Validação de CPF e máscara
    $("#CPF").on('change', (e) => {
        $(e.target).val(Mask($(e.target).val()));
        CPFValidator($(e.target).val());
    })

    $("#formCadastroBen").find("#btn-incluir").on('click', (e) => {
        e.preventDefault()
        return $.Deferred(function ($dfd) {
            $.ajax({
                url: urlHome,
                method: "POST",
                data: {
                    "IdCliente": 0,
                    "Nome": $("#formCadastroBen").find("#Nome").val(),
                    "CPF": $("#formCadastroBen").find("#CPF").val(),
                },
                success: (data) => {
                    $dfd.resolve(data);
                    ModalDialog("Concluído", "Cadastre o Cliente para finalizar!");
                    $("#modalBeneficiario").modal('hide');
                }
            });
        });
    });
}

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}

/*
 * Função responsável por mascarar o campo CPF
 */
function Mask(cpfOnlyNumbers) {
    let normalizedCPF = '';

    cpfOnlyNumbers = cpfOnlyNumbers.replace(/\D/g, "") //Remove tudo o que não é dígito
    cpfOnlyNumbers = cpfOnlyNumbers.replace(/(\d{3})(\d)/, "$1.$2") //Coloca um ponto entre o terceiro e o quarto dígitos
    cpfOnlyNumbers = cpfOnlyNumbers.replace(/(\d{3})(\d)/, "$1.$2") //Coloca um ponto entre o terceiro e o quarto dígitos de novo (para o segundo bloco de números)
    cpfOnlyNumbers = cpfOnlyNumbers.replace(/(\d{3})(\d{1,2})$/, "$1-$2") //Coloca um hífen entre o terceiro e o quarto dígitos

    normalizedCPF = cpfOnlyNumbers;

    return normalizedCPF
}

/*
 * Função responsável por validar o CPF, através do calculo de digito verificador
 */
function CPFValidator(CPF) {
    let multiplicationOfFirstCPFDigits = []
    let restOfSumFirstDigits = 0;
    let resultCheckDigit = 0;
    let indexOfMultiplication = 10;

    let firstDigitsOfCPF = CPF.split("-")[0].replace(/\D/g, "").split('').map(char => parseInt(char, 10)); // Primeiros 9 digitos do CPF, convertidos em um array de inteiros
    let firstCheckDigit = CPF.split("-")[1].replace(/\D/g, "").split('').map(char => parseInt(char, 10))[0]; // Primeiro digito verificador

    // Multiplicação dos 9 primeiros digitos do CPF por pesos decrescentes, de 10 a 2
    firstDigitsOfCPF.forEach(element => {
        multiplicationOfFirstCPFDigits.push(element * indexOfMultiplication)
        indexOfMultiplication--
    })

    restOfSumFirstDigits = multiplicationOfFirstCPFDigits.reduce((acum, currentVal) => acum + currentVal, 0) % 11 // Considerando apenas o resto da soma da multiplicação acima

    // Caso o resto da soma seja menor que 2, então o primerio digito verficador deve ser 10, se não eu comparo abaixo, o digito verficador que eu obtive no calculo, com o que foi passado no campo CPF
    if (!restOfSumFirstDigits < 2) {
        resultCheckDigit = 11 - restOfSumFirstDigits
    }

    // Resultado da validação
    if (firstCheckDigit != resultCheckDigit) {
        ModalDialog(`CPF ${CPF} inválido!`, "Insira um valor válido no campo CPF...");
        $("#CPF").val('');
    }
}
