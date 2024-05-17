
$(document).ready(function () {
    $(document).find("#beneficiario").on('click', () => {
        let modal = $(document).find("#modalBeneficiario");
        modal.find("#formCadastroBen")[0].reset()
        modal.find('#gridBeneficiarios').show();
        modal.modal();
        BeneficiariosPoulateTable(modal)
    });
})

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
                                "IdCliente": IdCliente != 0 && IdCliente != null ? IdCliente : 0,
                            },
                            success: (data) => {
                                $dfd.resolve(data);
                                console.log(data);
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