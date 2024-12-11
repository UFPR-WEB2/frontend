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
import { HeaderClienteComponent } from '../../../material/header-cliente/header-cliente.component';
import { DatePipe } from '@angular/common';
import { RepairService } from '../../../services/api/repair.service';
import { IRepair } from '../../../models/repair.model';
import { EmployeeService, Employee } from '../../../services/api/employee.service';

@Component({
  selector: 'app-efetuar-manutencao',
  standalone: true,
  imports: [HeaderClienteComponent, CommonModule, FormsModule],
  templateUrl: './efetuar-manutencao.component.html',
  styleUrl: './efetuar-manutencao.component.css',
  providers: [DatePipe],
})
export class EfetuarManutencaoComponent {
  funcionarios: any[] = [];
  cliente: any;
  mostrarComboBox: boolean = false;
  descricaoManutencao: string = '';
  orientacoesCliente: string = '';
  funcionarioSelecionado: string = '';
  id: number | null = null;
  servico: MaintenanceResponse | null = null;
  funcionario_id : number | null = null;

  maintenanceModal: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private maintenanceService: MaintenanceService,
    private authService: AuthService,
    private repairService: RepairService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {


    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.authService.getSession().subscribe({
      next: (response) => {
        this.funcionarioSelecionado = response.id;
        this.funcionario_id = response.body.id;
        response.role = response.role;
      },
      error: (err) => {
        console.error('Erro ao recuperar sessão:', err);
      },
    });
    this.employeeService.listarFuncionarios().subscribe({
      next: (funcionarios) => {
        console.log(funcionarios)
        console.log(Number(this.funcionario_id))
        this.funcionarios = funcionarios.filter(
          (funcionario) => funcionario.id !== Number(this.funcionario_id)
        );
      },
      error: (error) => {
        console.error('Erro ao carregar funcionários:', error);
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

  openMaintenanceModal() {
    this.maintenanceModal = true;
    this.mostrarComboBox = false;
  }

  closeMaintenanceModal() {
    this.maintenanceModal = false;
    this.descricaoManutencao = '';
    this.orientacoesCliente = '';
  }

  mostrarRedirecionamento() {
    this.mostrarComboBox = true;
    this.maintenanceModal = false;
  }

  redirecionar() {
    if (this.id && this.funcionarioSelecionado) {
      const idManutencao = this.id;
      const idFuncionario = Number(this.funcionarioSelecionado);
      console.log(idManutencao)
      console.log(idFuncionario)
      this.repairService.redirectMaintenance(idManutencao, idFuncionario).subscribe({
        next: (response) => {
          window.alert('Responsável redirecionado com sucesso!');
          this.router.navigate(['/funcionario/home']); 
        },
        error: (err) => {
          console.error('Erro ao redirecionar manutenção:', err);
          window.alert('Erro ao redirecionar manutenção.');
        },
      });
    } else {
      window.alert('Por favor, selecione um funcionário.');
    }
  }
  

  registrarManutencao() {
    // ABCDE - APLICAR VALIDAÇÃO
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
    this.maintenanceModal = false;
  }
}
