/*function carregarDetalhes() {

    const solicitacao = JSON.parse(localStorage.getItem('solicitacao'));

    document.getElementById('idSolicitacao').textContent = solicitacao.id;
    document.getElementById('descricaoEquipamento').textContent = solicitacao.descricaoEquipamento;
    document.getElementById('categoriaEquipamento').textContent = solicitacao.categoriaEquipamento;
    document.getElementById('descricaoDefeito').textContent = solicitacao.descricaoDefeito;
    document.getElementById('precoOrcamento').textContent = solicitacao.precoOrcamento;

    const historicoPassos = solicitacao.historicoPassos;
    const historicoTable = document.getElementById('historicoPassos');

    historicoPassos.forEach(passo => {
        const row = historicoTable.insertRow();
        const cellDataHora = row.insertCell(0);
        const cellFuncionario = row.insertCell(1);
        const cellDescricao = row.insertCell(2);

        cellDataHora.textContent = passo.dataHora;
        cellFuncionario.textContent = passo.funcionario;
        cellDescricao.textContent = passo.descricao;
    });


}
    */
function mostrarDetalhes(id) {
    const solicitacoess = {
        1: {
            idSolicitacao: "001",
            descricaoEquipamento: "Equipamento B com falha...",
            categoriaEquipamento: "Celular",
            descricaoDefeito: "A tela não mostra imagem",
            precoOrcamento: "R$ 100,00"
        }
    };

    const solicitacaos = solicitacoess[id];


    localStorage.setItem('solicitacao', JSON.stringify(solicitacaos));


    window.location.href = './servico-view/index.html';
}


function adicionarLinhaHistorico(dataHora, funcionario, descricao) {
    // Seleciona a tabela pelo ID
    const tabela = document.getElementById("historicoPassos");

    // Cria uma nova linha (tr)
    const novaLinha = tabela.insertRow();

    // Cria as células para data/hora, funcionário e descrição
    const celulaDataHora = novaLinha.insertCell(0);
    const celulaFuncionario = novaLinha.insertCell(1);
    const celulaDescricao = novaLinha.insertCell(2);

    // Define os valores das células
    celulaDataHora.textContent = dataHora;
    celulaFuncionario.textContent = funcionario;
    celulaDescricao.textContent = descricao;
}

// Exemplo de uso:
adicionarLinhaHistorico('02/02/2022 10:00', 'Ana', 'Revisou o celular após reparo');
adicionarLinhaHistorico('03/03/2022 14:30', 'Lucas', 'Realizou teste final');

function aprovarServico() {
    const solicitacao = JSON.parse(localStorage.getItem('solicitacao'));
    const precoOrcamento = solicitacao.precoOrcamento;

    alert(`Serviço Aprovado no Valor R$ ${precoOrcamento}`);
    localStorage.setItem('solicitacao', JSON.stringify(solicitacao));

    window.location.href = "../index.html";
}

window.onload = carregarDetalhes;

function aprovarServico() {
    const solicitacao = JSON.parse(localStorage.getItem('solicitacao'));
    const precoOrcamento = solicitacao.precoOrcamento;

    alert(`Serviço Aprovado no Valor R$ ${precoOrcamento}`);
    localStorage.setItem('solicitacao', JSON.stringify(solicitacao));

    window.location.href = "../index.html";
}

function rejeitarServico() {
    const motivoRejeicao = prompt("Motivo da rejeição:");
    const solicitacao = JSON.parse(localStorage.getItem('solicitacao'));

    solicitacao.motivoRejeicao = motivoRejeicao;
    localStorage.setItem('solicitacao', JSON.stringify(solicitacao));
    alert('Serviço Rejeitado!');

    window.location.href = "../index.html";
}


