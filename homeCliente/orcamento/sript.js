function mostrarOrcamento(id) {
    const solicitacoes = {
        1: {
            descricaoEquipamento: "Equipamento A com falha...",
            categoriaEquipamento: "Desktop",
            descricaoDefeito: "A tela não mostra imagem",
            precoOrcamento: "R$ 500,00"
        }
    };

    const solicitacao = solicitacoes[id];

    localStorage.setItem('solicitacao', JSON.stringify(solicitacao));

    window.location.href = './orcamento/index.html';
}