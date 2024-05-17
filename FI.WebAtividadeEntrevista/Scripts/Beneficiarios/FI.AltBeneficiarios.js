$(document).ready(function () {
    $("#modalBeneficiario").find('#gridBeneficiarios').show()

    $("#formCadastroBen").find("#btn-alterar").on('click', (e) => {
        e.preventDefault()
        var gridIsHidden = $("#modalBeneficiario").find('#gridBeneficiarios').is(":hidden");
        debugger
        if (!gridIsHidden) {
            return $.Deferred(function ($dfd) {
                $.ajax({
                    url: urlIncluirBen,
                    method: "POST",
                    data: {
                        "IdCliente": IdCliente,
                        "NOME": $("#formCadastroBen").find("#Nome").val(),
                        "CPF": $("#formCadastroBen").find("#CPF").val(),
                    },
                    error:
                        function (r) {
                            if (r.status == 400)
                                ModalDialog("Ocorreu um erro", r.responseJSON);
                            else if (r.status == 500)
                                ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                        },
                    success: (data) => {
                        $dfd.resolve(data);
                        ModalDialog("Sucesso!", "Beneficiário atualizado com sucesso!");
                        $("#modalBeneficiario").modal('hide');
                    }
                });
            });
        } 
    });
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

function AlterarBen(Id, CPF, Nome) {
    debugger
    $("#modalBeneficiario").find('#gridBeneficiarios').hide();
    $("#formCadastroBen").find("#Nome").val(Nome);
    $("#formCadastroBen").find("#CPF").val(CPF);

    $("#formCadastroBen").find("#btn-alterar").on('click', (e) => {
        e.preventDefault()
        var gridIsHidden = $("#modalBeneficiario").find('#gridBeneficiarios').is(":hidden");
        debugger
        if (gridIsHidden) {
            return $.Deferred(function ($dfd) {
                $.ajax({
                    url: urlAlteracaoBen,
                    method: "POST",
                    data: {
                        "Id": Id,
                        "NOME": $("#formCadastroBen").find("#Nome").val(),
                        "CPF": $("#formCadastroBen").find("#CPF").val(),
                    },
                    error:
                        function (r) {
                            if (r.status == 400)
                                ModalDialog("Ocorreu um erro", r.responseJSON);
                            else if (r.status == 500)
                                ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                        },
                    success: (data) => {
                        $dfd.resolve(data);
                        ModalDialog("Sucesso!", "Beneficiário atualizado com sucesso!");
                        $("#modalBeneficiario").modal('hide');
                    }
                });
            });
        } else {
            return $.Deferred(function ($dfd) {
                $.ajax({
                    url: urlIncluirBen,
                    method: "POST",
                    data: {
                        "IdCliente": IdCliente,
                        "NOME": $("#formCadastroBen").find("#Nome").val(),
                        "CPF": $("#formCadastroBen").find("#CPF").val(),
                    },
                    error:
                        function (r) {
                            if (r.status == 400)
                                ModalDialog("Ocorreu um erro", r.responseJSON);
                            else if (r.status == 500)
                                ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                        },
                    success: (data) => {
                        $dfd.resolve(data);
                        ModalDialog("Sucesso!", "Beneficiário atualizado com sucesso!");
                        $("#modalBeneficiario").modal('hide');
                    }
                });
            });
        }
    });
}