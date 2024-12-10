import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HeaderClienteComponent } from '../../../material/header-cliente/header-cliente.component';
import { DatePipe } from '@angular/common';
import { BudgetService } from '../../../services/api/budget.service';
import {
  MaintenanceService,
  MaintenanceResponse,
} from '../../../services/api/maintenance.service';

@Component({
  selector: 'app-efetuar-orcamento',
  standalone: true,
  imports: [HeaderClienteComponent, CommonModule, FormsModule],
  templateUrl: './efetuar-orcamento.component.html',
  styleUrls: ['./efetuar-orcamento.component.css'],
  providers: [DatePipe] 
})
export class EfetuarOrcamentoComponent {
  id: number | null = null;
  item: any;
  servicos: any[] = [];
  perfis: any[] = [];
  valor: string = '';
  servico: MaintenanceResponse | undefined;
  erro: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private budgetService: BudgetService,
    private maintenanceService: MaintenanceService,

  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.maintenanceService.getMaintenanceById(this.id).subscribe({
      next: (data) => {
        this.servico = {
          ...data
        };
        console.log(this.servico)
      },
      error: (error) => {
        this.erro = error.message;
        console.log('Erro ao carregar solicitação', error);
      },
    });

}

  onValueChange(value: string) {
    let formattedValue = value.replace('R$ ', '').replace(/\D/g, '');
    if (formattedValue.length > 2) {
      formattedValue = formattedValue.slice(0, -2) + ',' + formattedValue.slice(-2);
    }

    if (formattedValue) {
      this.valor = `R$ ${formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`; 
    } else {
      this.valor = '';
    }
  }

  formatarValor() {
    if (this.valor) {
      this.valor = `R$ ${parseFloat(this.valor.replace('R$ ', '').replace(',', '.')).toFixed(2).replace('.', ',')}`;
    }
  }

  isNumberKey(event: KeyboardEvent) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ([8, 9, 27, 13].indexOf(charCode) !== -1 ||
         (charCode >= 48 && charCode <= 57) || 
         (charCode >= 96 && charCode <= 105) ||
         charCode === 110 || 
         charCode === 190) {
      return;
    }
    event.preventDefault();
  }

  onSubmit(form: any) {
    if (form.valid) {
      if (this.valor) {
        const valorSemMascara = parseFloat(this.valor.replace('R$ ', '').replace(',', '.'));
        if (valorSemMascara >= 0) {
          const id = this.route.snapshot.paramMap.get('id');
          if (id) {
            const budgetRequest = {
              precoOrcado: valorSemMascara,
              maintenanceId: Number(id)
            };
  
            this.budgetService.createBudget(budgetRequest).subscribe({
              next: (response) => {
                window.alert('Orçamento criado com sucesso!');
                this.router.navigate(['/funcionario/home']);
              },
              error: (err) => {
                console.error('Erro ao criar orçamento', err);
              }
            });
          } else {
            console.error('ID não encontrado na URL');
          }
        } else {
          console.error("Valor não pode ser negativo");
        }
      } else {
        console.error("Valor não pode ser nulo");
      }
    } else {
      console.error("Formulário inválido");
    }
  }
}
