import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MaintenanceService, MaintenanceResponse } from '../../../services/api/maintenance.service';

@Component({
  selector: 'app-relatorio-receitas',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './relatorio-receitas.component.html',
  styleUrls: ['./relatorio-receitas.component.css'],
})
export class RelatorioReceitasComponent implements OnInit {

  constructor(private router: Router, private maintenanceService: MaintenanceService) { }

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
  receitas: MaintenanceResponse[] = [];
  receitasFiltradas: MaintenanceResponse[] = [];
  lucroPorDia: { dia: string, lucro: number }[] = [];

  ngOnInit(): void {
    this.getAllReceitas();
  }

  getAllReceitas() {
    this.maintenanceService.getFinishedMaintenance().subscribe(
      (data) => {
        this.receitas = data;
        this.receitasFiltradas = [...this.receitas];
        this.lucroPorDia = this.calcularLucroPorDia(this.receitas);
      },
      (error) => {
        console.error('Erro ao carregar Receitas', error);
      }
    );
  }

  calcularLucroPorDia(receitas: MaintenanceResponse[]): { dia: string, lucro: number }[] {
    const lucroPorDiaMap = receitas.reduce((acc, receita) => {
      if (receita.dataFinalizacao && receita.valorConserto) {

        const [datePart] = receita.dataFinalizacao.split('T');
        const [ano, mes, dia] = datePart.split('-');
        const dataSimplificada = `${dia}/${mes}/${ano}`;

        if (!acc[dataSimplificada]) {
          acc[dataSimplificada] = 0;
        }
        acc[dataSimplificada] += receita.valorConserto;
      }
      return acc;
    }, {} as { [key: string]: number });

    return Object.entries(lucroPorDiaMap).map(([dia, lucro]) => ({
      dia,
      lucro,
    }));
  }

  filtrarReceitas(event: Event) {
    event.preventDefault();

    const start = this.startDate ? new Date(this.startDate) : null;
    const end = this.endDate ? new Date(this.endDate) : null;

    this.receitasFiltradas = this.receitas.filter(receita => {
      if (receita.dataFinalizacao) {
        const dataReceita = new Date(receita.dataFinalizacao);
        if (start && end) {
          return dataReceita >= start && dataReceita <= end;
        }
        if (start && !end) {
          return dataReceita >= start;
        }
        if (!start && end) {
          return dataReceita <= end;
        }
        return true;
      }
      return false;
    });

    this.lucroPorDia = this.calcularLucroPorDia(this.receitasFiltradas);
  }

  limparFiltro() {
    this.startDate = '';
    this.endDate = '';
    this.receitasFiltradas = this.receitas;
    this.lucroPorDia = this.calcularLucroPorDia(this.receitas);
  }

  calcularTotal() {
    return this.receitasFiltradas.reduce((total, receita) => total + (receita.valorConserto || 0), 0);
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
      const valorFormatado = receita.valorConserto?.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }) || 'R$ 0,00';
      doc.text(`${receita.dataFinalizacao}: ${valorFormatado}`, 10, y);
      y += 10;
    });

    doc.setFont('helvetica', 'bold');
    const totalFormatado = this.calcularTotal().toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    doc.text(`Total: ${totalFormatado}`, 10, y + 10);

    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString('pt-BR');
    const timeString = currentDate.toLocaleTimeString('pt-BR');
    doc.text(`Gerado em: ${dateString} às ${timeString}`, 10, y + 20);

    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text('Página ' + String(i) + ' de ' + String(totalPages), 180, 290, { align: 'right' });
    }

    doc.save('relatorio_receitas.pdf');
  }
}
