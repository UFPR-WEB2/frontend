import { AuthService } from './../../../services/api/auth.service';
import {
  MaintenanceResponse,
  MaintenanceService,
} from './../../../services/api/maintenance.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ServicoStorageService } from '../../../services/servico-storage.service';
import { HeaderClienteComponent } from '../../../material/header-cliente/header-cliente.component';
import { DatePipe } from '@angular/common';
import { RepairService } from '../../../services/api/repair.service';
import { IRepair } from '../../../models/repair.model';

@Component({
  selector: 'app-efetuar-manutencao',
  standalone: true,
  imports: [HeaderClienteComponent, CommonModule, FormsModule],
  templateUrl: './efetuar-manutencao.component.html',
  styleUrl: './efetuar-manutencao.component.css',
  providers: [DatePipe],
})
export class EfetuarManutencaoComponent {
  item: any;
  funcionarios: any[] = []; // Lista de funcionários
  cliente: any;
  mostrarFormulario: boolean = false;
  mostrarComboBox: boolean = false;
  descricaoManutencao: string = '';
  orientacoesCliente: string = '';
  funcionarioSelecionado: string = '';
  id: number | null = null;
  servico: MaintenanceResponse | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private maintenanceService: MaintenanceService,
    private authService: AuthService,
    private repairService : RepairService
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.authService.getSession().subscribe({
      next: (response) => {
        console.log('Sessão do usuário:', response);
        this.funcionarioSelecionado = response.id;
        response.role = response.role;
      },
      error: (err) => {
        console.error('Erro ao recuperar sessão:', err);
      },
    });
    this.maintenanceService.getMaintenanceById(this.id).subscribe({
      next: (data) => {
        this.servico = {
          ...data,
          dataConserto:
            this.datePipe.transform(data.dataConserto, 'dd/MM/yyyy') ||
            undefined,
          dataCriacao:
            this.datePipe.transform(data.dataCriacao, 'dd/MM/yyyy') ||
            undefined,
          dataFinalizacao:
            this.datePipe.transform(data.dataFinalizacao, 'dd/MM/yyyy') ||
            undefined,
        };
      },
      error: (error) => {
        console.error('Erro ao carregar solicitação', error);
      },
    });
  }

  efetuarManutencao() {
    this.mostrarFormulario = true;
    this.mostrarComboBox = false;
  }

  mostrarRedirecionamento() {
    this.mostrarComboBox = true;
    this.mostrarFormulario = false;
  }

  redirecionar() {
    /*
    ---------- ISSO AINDA NAO FOI FEITO ---------
    //ABCDE
    const confirmacao = window.confirm('Você tem certeza que deseja redirecionar este serviço para outro funcionário?');
    if (confirmacao && this.funcionarioSelecionado) {
      const dadosAtualizados = {
        status: 'REDIRECIONADA',
        funcionario: this.funcionarioSelecionado
      };
      window.alert('Serviço redirecionado com sucesso!');
      this.servicoStorage.updateServico(this.item.id, dadosAtualizados);
      this.router.navigate(['/funcionario/home']);
    } else {
      window.alert('Por favor, selecione um funcionário para redirecionar.');
    }*/
  }


    registrarManutencao() {
      if (this.servico && this.descricaoManutencao && this.orientacoesCliente) {
        const repairData: IRepair = {
          idManutencao: Number(this.id),
          descricaoConserto: this.descricaoManutencao,
          orientacaoCliente: this.orientacoesCliente,
        };
    
        this.repairService.createRepair(repairData).subscribe({
          next: () => {
            window.alert('Manutenção registrada com sucesso!');
            this.router.navigate(['/funcionario/home']);
          },
          error: (err) => {
            console.error('Erro ao registrar manutenção:', err);
            window.alert('Erro ao registrar manutenção.');
          },
        });
      } else {
        window.alert('Por favor, preencha todos os campos.');
      }
    }
    

  onSubmit() {
    /*
    if (!this.descricaoManutencao || !this.orientacoesCliente) {
      window.alert('Por favor, preencha todos os campos antes de enviar.');
      return;
    }
    const confirmacao = window.confirm('Você tem certeza que deseja efetuar essa manutenção?');
    if (confirmacao) {
      const dadosAtualizados = {
        status: 'AGUARDANDO PAGAMENTO',
        funcionarioFinalizacao: this.usuarioLogado.nome,
        orientacoesCliente: this.orientacoesCliente,
        descricaoManutencao: this.descricaoManutencao
      };

      window.alert('Serviço efetuado com sucesso!');
      this.servicoStorage.updateServico(this.item.id, dadosAtualizados);
      this.router.navigate(['/funcionario/home']);
      }*/
  }
}
