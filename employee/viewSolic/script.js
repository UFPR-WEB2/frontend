$(document).ready(function () {
    const employees = [
        { id: 1, name: 'Maria' },
        { id: 2, name: 'Mário' },
        { id: 3, name: 'Carlos' }
    ];

    employees.forEach(employee => {
        $('#select-employee').append(new Option(employee.name, employee.id));
    });

    $("#submit-budget").click(function () {
        $("#redirect-info").show();
    });

    $("#btn-confirm-redirect").click(function () {
        const selectedEmployee = $("#select-employee").val();
        if (selectedEmployee) {
            const currentEmployeeId = 1;
            if (selectedEmployee != currentEmployeeId) {
                const dateTime = new Date().toLocaleString();
                const originEmployee = employees.find(emp => emp.id == currentEmployeeId).name;
                const destinationEmployee = employees.find(emp => emp.id == selectedEmployee).name;

                $("#request-info").append(`<p><strong>Estado:</strong> REDIRECIONADA</p>`);
                $("#request-info").append(`<p><strong>Histórico:</strong> ${dateTime} - Redirecionada de ${originEmployee} para ${destinationEmployee}</p>`);

                $("#redirect-info").hide();
            } else {
                alert("Não é possível redirecionar para si mesmo.");
            }
        } else {
            alert("Por favor, selecione um funcionário.");
        }
    });

    $("#btn-enviar").click(function () {
        const descManunt = $("#desc-manunt").val();
        const orienClient = $("#orien-client").val();

        if (descManunt && orienClient) {
            const dateTime = new Date().toLocaleString();
            $("#request-info").append(`<p><strong>Histórico:</strong> ${dateTime} - Manutenção efetuada: ${descManunt}. Orientações: ${orienClient}</p>`);
            $("#infos-efetuar-manunt").hide();
            $("#desc-manunt").val('');
            $("#orien-client").val('');
            alert("Manutenção enviada com sucesso!");
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    });

    function getClientInfo() {
        return {
            name: 'João da Silva',
            email: 'joao.silva@example.com',
            phone: '(11) 98765-4321',
            cpf: '11111111111',
            cep: '1111111111',
            country: 'Brasil',
            state: 'Paraná',
            city: 'Curitiba'
        };
    }

    function getRequestInfo() {
        return {
            id: '001',
            dateTime: '15/09/24 10:00',
            description: 'Equipamento A com falha...',
            category: 'Desktop',
            defect: 'A tela não mostra imagem',
            status: 'ORÇADA',
            history: ''
        };
    }

    const clientInfo = getClientInfo();
    const requestInfo = getRequestInfo();

    // Preencher informações do cliente
    $('#client-info').append(`
        <p><strong>Nome:</strong> ${clientInfo.name}</p>
        <p><strong>Email:</strong> ${clientInfo.email}</p>
        <p><strong>Telefone:</strong> ${clientInfo.phone}</p>
        <p><strong>CPF:</strong> ${clientInfo.cpf}</p>
        <p><strong>CEP:</strong> ${clientInfo.cep}</p>
        <p><strong>País:</strong> ${clientInfo.country}</p>
        <p><strong>Estado:</strong> ${clientInfo.state}</p>
        <p><strong>Cidade:</strong> ${clientInfo.city}</p>
    `);

    // Preencher informações da solicitação
    $('#request-info').append(`
        <p><strong>ID:</strong> ${requestInfo.id}</p>
        <p><strong>Data/Hora:</strong> ${requestInfo.dateTime}</p>
        <p><strong>Descrição:</strong> ${requestInfo.description}</p>
        <p><strong>Categoria:</strong> ${requestInfo.category}</p>
        <p><strong>Defeito:</strong> ${requestInfo.defect}</p>
        <p><strong>Estado:</strong> ${requestInfo.status}</p>
        <p><strong>Histórico:</strong> ${requestInfo.history}</p>
    `);
});
