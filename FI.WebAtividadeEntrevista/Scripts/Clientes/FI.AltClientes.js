
$(document).ready(function () {
    if (obj) {
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);
        $('#formCadastro #CPF').val(obj.CPF);
    }

    $(document).find("#beneficiario").on('click', () => {
        let modal = $(document).find("#modalBeneficiario");
        modal.find("#formCadastroBen")[0].reset()
        modal.find('#gridBeneficiarios').show();
        modal.modal();
        BeneficiariosPoulateTable(modal)
    });

    $('#formCadastro').submit(function (e) {
        e.preventDefault();

        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val(),
                "CPF": $(this).find("#CPF").val(),
            },
            error:
                function (r) {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (r) {
                    ModalDialog("Sucesso!", r)
                    $("#formCadastro")[0].reset();
                    window.location.href = urlRetorno;
                }
        });
    })

})

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

function ExcluirBen(Id) {
    return $.Deferred(function ($dfd) {
        $.ajax({
            url: urlExclusaoBen,
            method: "POST",
            data: {
                "Id": Id,
            },
            success: (data) => {
                $dfd.resolve(data);
                ModalDialog("Sucesso!", "Beneficiário exluído com sucesso!")

                $("#modalBeneficiario").modal('hide');
            },
            error:
                function (r) {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");

                    $dfd.reject();
                },
        });
    });
}

/*
* Função responsável por popular os beneficiários no modal de beneficiários
* */
function BeneficiariosPoulateTable(modal) {
    if (modal.find("table"))
        $('#gridBeneficiarios').jtable({
            paging: false, //Enable paging
            pageSize: 5, //Set page size (default: 10)
            sorting: false, //Enable sorting
            defaultSorting: 'Nome ASC', //Set default sorting
            actions: {
                listAction: () => {
                    return $.Deferred(function ($dfd) {
                        $.ajax({
                            url: urlBeneficiarioList,
                            method: "POST",
                            data: {
                                "IdCliente": obj.Id,
                            },
                            success: (data) => {
                                $dfd.resolve(data);
                            },
                            error:
                                function (r) {
                                    if (r.status == 400)
                                        ModalDialog("Ocorreu um erro", r.responseJSON);
                                    else if (r.status == 500)
                                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");

                                    $dfd.reject();
                                },
                        });
                    });
                },
            },
            messages: {
                noDataAvailable: '' // Define uma mensagem vazia para remover o texto
            },
            fields: {
                CPF: {
                    title: 'CPF',
                    width: '25%'
                },
                Nome: {
                    title: 'Nome',
                    width: '25%'
                },
                Alterar: {
                    title: '',
                    display: function (data) {
                        return `<button onclick="AlterarBen(${data.record.Id}, '${data.record.CPF}', '${data.record.Nome}')" class="btn btn-primary btn-sm">Alterar</button>`;
                    }
                },
                Excluir: {
                    title: '',
                    display: function (data) {
                        return `<button onclick="ExcluirBen(${data.record.Id})" id="btn-excluir-ben" class="btn btn-primary btn-sm">Excluir</button>`;
                    }
                }
            }
        });

    //Load student list from server
    if (document.getElementById("gridBeneficiarios"))
        $('#gridBeneficiarios').jtable('load');

}
