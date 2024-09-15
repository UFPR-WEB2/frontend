document.querySelectorAll('.solicitacao').forEach(function (sol) {
    const estado = sol.querySelector('.estado').innerText;
    const botao = sol.querySelector('.acao');

    switch (estado) {
        case 'ORÇADA':
            botao.innerText = 'Aprovar/Rejeitar Serviço';
            botao.addEventListener('click', function() {
                window.location.href = './mostrar-orcamento.html';
            });
            break;
        case 'ARRUMADA':
            botao.innerText = 'Pagar Serviço';
            botao.addEventListener('click', function() {
                window.location.href = './pagar-servico.html';
            });
            break;
        case 'REJEITADA':
            botao.innerText = 'Resgatar Serviço';
            botao.addEventListener('click', function() {
                window.location.href = './resgatar-servico.html';
            });
            break;
        case 'APROVADA':
            botao.style.display = 'none';
            break;
        default:
            botao.innerText = 'Visualizar Serviço';
            break;
    }
});
