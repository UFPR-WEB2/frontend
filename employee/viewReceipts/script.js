document.getElementById('generate-pdf').addEventListener('click', function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFillColor(230, 230, 250); 
    doc.rect(10, 10, 190, 277, 'F'); 

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 102, 204); 
    doc.setFontSize(22);
    doc.text('Relatório de Receitas', 14, 22);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); 
    doc.text('Período', 14, 30);
    doc.text('Data Inicial: ' + document.getElementById('start-date').value, 14, 36);
    doc.text('Data Final: ' + document.getElementById('end-date').value, 14, 42);

    doc.text('Receitas:', 14, 50);

    const table = document.getElementById('report-table');
    const rows = table.querySelectorAll('tr');
    let y = 58;

    rows.forEach((row, index) => {
        const cells = row.querySelectorAll('th, td');
        let x = 14;
        cells.forEach(cell => {
            doc.text(cell.innerText, x, y);
            x += 50;
        });
        y += 8;
    });

    const total = document.querySelector('#total h3').innerText;
    doc.text(total, 14, y + 10);
    const currentDate = new Date();
    doc.text('Data e Hora de Geração: ' + currentDate.toLocaleString(), 14, y + 20);

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text('Página ' + String(i) + ' de ' + String(pageCount), 180, 290, null, null, 'right');
    }

    doc.save('relatorio_receitas.pdf');
});

document.getElementById('filter-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const startDate = new Date(document.getElementById('start-date').value);
    const endDate = new Date(document.getElementById('end-date').value);
    const rows = document.querySelectorAll('#report-table tbody tr');

    rows.forEach(row => {
        const dateCell = row.querySelector('td:first-child');
        const date = new Date(dateCell.innerText.split('/').reverse().join('-'));

        if (date >= startDate && date <= endDate) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});