import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderClienteComponent } from '../../../material/header-cliente/header-cliente.component';
import { Router } from '@angular/router';
import { NavbarFuncionarioComponent } from '../../../material/navbar-funcionario/navbar-funcionario.component';
import { DatePipe } from '@angular/common';
import {
  MaintenanceResponse,
  MaintenanceService,
} from '../../../services/api/maintenance.service';
import { BudgetService } from '../../../services/api/budget.service';
import { authGuard } from '../../../auth/auth.guard';
import { AuthService } from '../../../services/api/auth.service';
import { Employee } from '../../../services/api/employee.service';

@Component({
  selector: 'app-visualizacao-solicitacoes',
  standalone: true,
  imports: [HeaderClienteComponent, NavbarFuncionarioComponent, CommonModule],
  templateUrl: './visualizacao-solicitacoes.component.html',
  styleUrls: ['./visualizacao-solicitacoes.component.css'],
  providers: [DatePipe],
})
export class VisualizacaoSolicitacoesComponent {
  servicos: MaintenanceResponse[] = [];
  servicosFiltrados: MaintenanceResponse[] = [];

  constructor(
    private maintenanceService: MaintenanceService,
    private budgetService: BudgetService,
    private router: Router,
    private datePipe: DatePipe,
    private authService: AuthService
  ) {}

  carregarServicos() {
    this.maintenanceService.getAllMaintenance().subscribe({
      next: (data) => {
        this.authService.getSession().subscribe({
          next: (response: any) => {
            const user = response.body;

            this.servicos = data.map((servico) => ({
              ...servico,
              dataConserto:
                this.datePipe.transform(
                  servico.dataConserto,
                  'dd/MM/yyyy -  HH:mm:ss'
                ) || undefined,
              dataCriacao:
                this.datePipe.transform(
                  servico.dataCriacao,
                  'dd/MM/yyyy -  HH:mm:ss'
                ) || undefined,
              dataFinalizacao:
                this.datePipe.transform(
                  servico.dataFinalizacao,
                  'dd/MM/yyyy -  HH:mm:ss'
                ) || undefined,
            }));

            this.servicosFiltrados = this.servicos.filter(
              (servico) =>
                servico.nomeFuncionario === user.name ||
                servico.nomeFuncionario === null
            );
          },
          error: (error) => {
            console.error('Erro ao obter sessão:', error);
          },
        });
      },
    });
  }

  efetuarManutencao(id: number | undefined) {
    if (id === undefined) return;
    this.router.navigate([`funcionario/home/efetuar-manutencao/${id}`]);
  }

  efetuarOrcamento(id: number | undefined) {
    if (id === undefined) return;
    this.router.navigate([`/funcionario/home/efetuar-orcamento/${id}`]);
  }

  finalizarSolicitacao(id: number | undefined) {
    if (id === undefined) return;
    const confirmacao = window.confirm(
      'Você tem certeza que deseja finalizar este serviço?'
    );
    if (confirmacao) {
      this.maintenanceService.finishMaintenance(id).subscribe({
        next: (response) => {
          console.log('Serviço finalizado:', response);
          this.carregarServicos();
        },
        error: (error) => {
          console.error('Erro ao finalizar serviço:', error);
        },
      });
    }
  }

  ngOnInit(): void {
    this.carregarServicos();
    this.servicosFiltrados = this.servicos;
  }

  converterParaData(dataString: string): Date {
    const partes = dataString.split(' ');
    const [dia, mes, ano] = partes[0].split('/');
    const [hora, minuto] = partes[1].split(':');

    return new Date(
      Number('20' + ano),
      Number(mes) - 1,
      Number(dia),
      Number(hora),
      Number(minuto)
    );
  }

  onFiltroAplicado(event: any) {
    const hoje = new Date();

    if (event.filtro === 'hoje') {
      this.servicosFiltrados = this.servicos.filter((servico) => {
        const dataServico = this.converterParaData(servico.dataCriacao || '');
        return dataServico.toDateString() === hoje.toDateString();
      });
    } else if (event.filtro === 'periodo') {
      const dataInicio = this.converterParaData(event.dataInicio);
      const dataFim = this.converterParaData(event.dataFim);
      this.servicosFiltrados = this.servicos.filter((servico) => {
        const dataServico = this.converterParaData(servico.dataCriacao || '');
        return dataServico >= dataInicio && dataServico <= dataFim;
      });
    } else {
      this.servicosFiltrados = this.servicos;
    }
  }
}
