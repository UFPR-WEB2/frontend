import { Component, OnInit, NgModule } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-relatorio-receitas',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './relatorio-receitas.component.html',
  styleUrl: './relatorio-receitas.component.css',
})
export class RelatorioReceitasComponent {

  constructor(private router: Router) { }

  goToRelatorioCategorias() {
    this.router.navigate(['/funcionario/home/relatorio-categorias']);
  }

  goToRelatorioDespesas() {
    this.router.navigate(['/funcionario/home/relatorio-despesas']);
  }

  goToHomeFuncionario() {
    this.router.navigate(['/funcionario/home']);
  }


  startDate: string = '';
  endDate: string = '';
  receitas = [
    { data: '06/08/2024', valor: 520.00 },
    { data: '07/08/2024', valor: 480.00 },
    { data: '08/08/2024', valor: 600.00 },
    { data: '09/08/2024', valor: 550.00 },
    { data: '10/08/2024', valor: 620.00 },
    { data: '11/09/2024', valor: 530.00 },
    { data: '12/09/2024', valor: 490.00 },
    { data: '13/09/2024', valor: 610.00 },
    { data: '14/09/2024', valor: 570.00 },
    { data: '15/09/2024', valor: 640.00 },
    { data: '19/09/2024', valor: 900.00 },
    { data: '01/10/2024', valor: 500.00 },
    { data: '02/10/2024', valor: 450.00 },
    { data: '03/10/2024', valor: 450.00 },
    { data: '04/10/2024', valor: 700.00 },
    { data: '05/10/2024', valor: 700.00 },
    { data: '06/10/2024', valor: 300.00 },
    { data: '07/10/2024', valor: 300.00 },
    { data: '08/10/2024', valor: 650.00 },
    { data: '09/10/2024', valor: 850.00 },
  ];

  receitasFiltradas = this.receitas;

  filtrarReceitas(event: Event) {
    event.preventDefault();
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    this.receitasFiltradas = this.receitas.filter(receita => {
      const dataReceita = new Date(receita.data.split('/').reverse().join('-'));
      return dataReceita >= start && dataReceita <= end;
    });
  }

  limparFiltro() {
    this.startDate = '';
    this.endDate = '';
    this.receitasFiltradas = this.receitas;
  }

  calcularTotal() {
    return this.receitasFiltradas.reduce((total, receita) => total + receita.valor, 0);
  }

  gerarPDF() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Relatório de Receitas', 10, 10);

    doc.setLineWidth(0.5);
    doc.line(10, 15, 200, 15);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');

    let y = 25;
    this.receitasFiltradas.forEach(receita => {
      doc.text(`${receita.data}: R$ ${receita.valor}`, 10, y);
      y += 10;
    });

    doc.setFont('helvetica', 'bold');
    doc.text(`Total: R$ ${this.calcularTotal()}`, 10, y + 10);

    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString('pt-BR');
    const timeString = currentDate.toLocaleTimeString('pt-BR');
    doc.text(`Gerado em: ${dateString} às ${timeString}`, 10, y + 20);

    // doc.addPage();
    // doc.setFontSize(12);
    // doc.setFont('helvetica', 'normal');

    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text('Página ' + String(i) + ' de ' + String(pageCount), 180, 290, { align: 'right' });
    }

    doc.save('relatorio_receitas.pdf');
  }
}
