import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderClienteComponent } from '../../../material/header-cliente/header-cliente.component';
import { BudgetService } from '../../../services/api/budget.service';
import { MaintenanceService } from '../../../services/api/maintenance.service';
import { MatDialog } from '@angular/material/dialog'; // Importação do MatDialog
import { ApprovalModalComponent } from '../../../modal/approval-modal/approval-modal.component';
@Component({
  selector: 'app-orcamento-cliente',
  standalone: true,
  imports: [HeaderClienteComponent, CommonModule],
  templateUrl: './orcamento-cliente.component.html',
  styleUrls: ['./orcamento-cliente.component.css']
})
export class OrcamentoClienteComponent {
  item: any;
  id: number | null = null;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private budgetService: BudgetService,
    private maintenanceService: MaintenanceService,
  ) { }

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
            }
          });
        },
        error: (err) => {
          console.error('Erro ao obter orçamento:', err);
        }
      });
    } else {
      console.error('ID do orçamento não fornecido');
    }
  }

  openApprovalModal() {
    const dialogRef = this.dialog.open(ApprovalModalComponent, {
      width: '400px',
      disableClose: true, // Impede fechar ao clicar fora
      panelClass: 'custom-modal',
      data: { precoOrcado: this.item?.precoOrcado },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.aprovarServico();
      }
    });
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
        }
      });
    }
  }

  rejeitarServico() {
    const motivo = prompt('Digite o motivo da rejeição:');
    if (this.id && motivo) {
      const updateRequest = {
        precoOrcado: this.item?.precoOrcado,
        descricao: `Rejeitado: ${motivo}`,
        maintenanceId: this.item?.maintenanceId
      };

      this.budgetService.updateBudget(this.id, updateRequest).subscribe({
        next: () => {
          this.budgetService.rejectBudget(this.id).subscribe({
            next: () => {
              alert('Serviço Rejeitado');
              this.router.navigate(['/cliente/home']);
            },
            error: (err) => {
              console.error('Erro ao rejeitar orçamento:', err);
            }
          });
        },
        error: (err) => {
          console.error('Erro ao atualizar orçamento antes da rejeição:', err);
        }
      });
    } else if (this.id && !motivo) {
      this.budgetService.rejectBudget(this.id).subscribe({
        next: () => {
          alert('Serviço Rejeitado sem motivo especificado');
          this.router.navigate(['/cliente/home']);
        },
        error: (err) => {
          console.error('Erro ao rejeitar orçamento:', err);
        }
      });
    }
  }
}
