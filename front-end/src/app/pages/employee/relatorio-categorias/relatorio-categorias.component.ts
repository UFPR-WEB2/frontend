import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import { MaintenanceService, MaintenanceResponse } from '../../../services/api/maintenance.service';

@Component({
  selector: 'app-relatorio-categorias',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './relatorio-categorias.component.html',
  styleUrls: ['./relatorio-categorias.component.css'],
})
export class RelatorioCategoriasComponent implements OnInit {

  constructor(private router: Router, private maintenanceService: MaintenanceService) { }

  startDate: string = '';
  endDate: string = '';
  
  // Aqui armazenaremos a estrutura de receitas por categoria.
  receitas: { categoria: string, valor: number }[] = [];
  receitasFiltradas: { categoria: string, valor: number }[] = [];

  ngOnInit(): void {
    // Ao iniciar o componente, buscamos os dados do serviço.
    this.getAllReceitasPorCategoria();
  }

  getAllReceitasPorCategoria() {
    // Supondo que maintenanceService.getFinishedMaintenance() retorna o mesmo array de MaintenanceResponse
    // usado anteriormente. Iremos então agrupar por categoria.
    this.maintenanceService.getFinishedMaintenance().subscribe(
      (data: MaintenanceResponse[]) => {
        // Agrupar receitas por categoria
        const receitasPorCategoriaMap: { [key: string]: number } = {};

        data.forEach((r) => {
          if (r.nomeCategoria && r.valorConserto) {
            if (!receitasPorCategoriaMap[r.nomeCategoria]) {
              receitasPorCategoriaMap[r.nomeCategoria] = 0;
            }
            receitasPorCategoriaMap[r.nomeCategoria] += r.valorConserto;
          }
        });

        // Converter o objeto em array
        this.receitas = Object.entries(receitasPorCategoriaMap).map(([categoria, valor]) => ({ categoria, valor }));
        this.receitasFiltradas = [...this.receitas];
      },
      (error) => {
        console.error('Erro ao carregar Receitas', error);
      }
    );
  }

  goToRelatorioReceitas() {
    this.router.navigate(['/funcionario/home/relatorio-receitas']);
  }

  goToRelatorioDespesas() {
    this.router.navigate(['/funcionario/home/relatorio-despesas']);
  }

  goToHomeFuncionario() {
    this.router.navigate(['/funcionario/home']);
  }

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
      const valorFormatado = receita.valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
      doc.text(`${receita.categoria}: ${valorFormatado}`, 10, y);
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
