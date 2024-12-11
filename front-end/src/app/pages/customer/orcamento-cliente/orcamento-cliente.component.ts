import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderClienteComponent } from '../../../material/header-cliente/header-cliente.component';
import { BudgetService } from '../../../services/api/budget.service';
import { MaintenanceService } from '../../../services/api/maintenance.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-orcamento-cliente',
  standalone: true,
  imports: [HeaderClienteComponent, CommonModule, FormsModule],
  templateUrl: './orcamento-cliente.component.html',
  styleUrls: ['./orcamento-cliente.component.css'],
})
export class OrcamentoClienteComponent {
  item: any;
  id: number | null = null;
  approvalModal: Boolean = false;
  rejectModal: Boolean = false;
  rejectReason: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private budgetService: BudgetService,
    private maintenanceService: MaintenanceService
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.budgetService.getBudgetByMaintenanceId(this.id).subscribe({
        next: (budgetResponse) => {
          this.item = budgetResponse;

          this.maintenanceService.getMaintenanceRecordById(this.id).subscribe({
            next: (maintenanceResponse) => {
              this.item.maintenanceDetails = maintenanceResponse;
              console.log(this.item);
            },
            error: (err) => {
              console.error('Erro ao obter serviço:', err);
            },
          });
        },
        error: (err) => {
          console.error('Erro ao obter orçamento:', err);
        },
      });
    } else {
      console.error('ID do orçamento não fornecido');
    }
  }

  openApprovalModal() {
    this.approvalModal = true;
    this.rejectModal = false;
  }

  openRejectModal() {
    this.rejectModal = true;
    this.approvalModal = false;
  }

  closeApprovalModal() {
    this.approvalModal = false;
  }

  closeRejectModal() {
    this.rejectModal = false;
    this.rejectReason = '';
  }

  aprovarServico() {
    if (this.id) {
      this.budgetService.approveBudget(this.id).subscribe({
        next: () => {
          alert(`Serviço Aprovado no Valor R$ ${this.item?.precoOrcado}`);
          this.router.navigate(['/cliente/home']);
        },
        error: (err) => {
          console.error('Erro ao aprovar orçamento:', err);
        },
      });
    }
  }

  rejeitarServico() {
    if (this.id) {
      const updateRequest = {
        descricao: this.rejectReason ? `Rejeitado: ${this.rejectReason}` : 'Rejeitado sem motivo',
      };

      this.budgetService.rejectBudget(this.id, updateRequest).subscribe({
        next: () => {
          this.closeRejectModal();
          this.router.navigate(['/cliente/home']);
        },
        error: (err) => {
          console.error('Erro ao rejeitar orçamento:', err);
        },
      });
    }
  }
}
