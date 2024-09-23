function carregarDetalhes() {
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


