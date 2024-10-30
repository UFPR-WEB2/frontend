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
  templateUrl: './relatorio-categorias.component.html',
  styleUrl: './relatorio-categorias.component.css',
})
export class RelatorioCategoriasComponent {

  constructor(private router: Router) { }

  goToRelatorioReceitas() {
    this.router.navigate(['/funcionario/home/relatorio-receitas']);
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
    { categoria: 'Desktop', data: '06/08/2024', valor: 3000.00 },
    { categoria: 'Notebook', data: '07/08/2024', valor: 2500.00 },
    { categoria: 'Impressora', data: '08/08/2024', valor: 2000.00 },
    { categoria: 'Mouse', data: '09/08/2024', valor: 1900.00 },
    { categoria: 'Teclado', data: '10/08/2024', valor: 2010.00 },
  ];

  receitasFiltradas = this.receitas;


  calcularTotal() {
    return this.receitasFiltradas.reduce((total, receita) => total + receita.valor, 0);
  }

  gerarPDF() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Relatório de Receitas por Categoria', 10, 10);

    doc.setLineWidth(0.5);
    doc.line(10, 15, 200, 15);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');

    let y = 25;
    this.receitasFiltradas.forEach(receita => {
      doc.text(`${receita.categoria} - ${receita.data}: R$ ${receita.valor}`, 10, y);
      y += 10;
    });

    doc.setFont('helvetica', 'bold');
    doc.text(`Total: R$ ${this.calcularTotal()}`, 10, y + 10);

    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString('pt-BR');
    const timeString = currentDate.toLocaleTimeString('pt-BR');
    doc.text(`Gerado em: ${dateString} às ${timeString}`, 10, y + 20);

    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text('Página ' + String(i) + ' de ' + String(pageCount), 180, 290, { align: 'right' });
    }

    doc.save('relatorio_receitas_categorias.pdf');
  }
}
