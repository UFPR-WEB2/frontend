$(document).ready(function() {
    const employees = [
        { id: 1, name: 'Maria' },
        { id: 2, name: 'Mário' },
        { id: 3, name: 'Carlos' }
    ];


    employees.forEach(employee => {
        $('#select-employee').append(new Option(employee.name, employee.id));
    });

    $("#submit-budget").click(function() {
        $("#redirect-info").show();
    });

    $("#btn-confirm-redirect").click(function() {
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
});