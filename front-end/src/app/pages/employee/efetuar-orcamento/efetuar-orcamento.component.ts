import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ServicoStorageService } from '../../../services/servico-storage.service';
import { HeaderClienteComponent } from '../../../material/header-cliente/header-cliente.component';
import { DatePipe } from '@angular/common';
import { BudgetService } from '../../../services/api/budget.service';

@Component({
  selector: 'app-efetuar-orcamento',
  standalone: true,
  imports: [HeaderClienteComponent, CommonModule, FormsModule],
  templateUrl: './efetuar-orcamento.component.html',
  styleUrls: ['./efetuar-orcamento.component.css'],// Correção aqui
  providers: [DatePipe] // Adicione esta linha
})
export class EfetuarOrcamentoComponent {
  item: any;
  servicos: any[] = [];
  perfis: any[] = [];
  cliente: any;
  valor: string = '';
  usuarioLogado: any;

  constructor(
    private servicoStorage: ServicoStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private budgetService: BudgetService
  ) {}

  ngOnInit() {
    this.recuperarUsuarioLogado();
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.servicos = this.servicoStorage.getServicos();
      const escolhido = this.servicos.find(s => s.id === id);
      this.item = escolhido || null;

      if (this.item) {
        this.perfis = this.servicoStorage.getPerfis();
        const clienteCriador = this.perfis.find(p => p.nome === this.item.cliente);
        this.cliente = clienteCriador;
      } else {
        console.error('Serviço não encontrado');
      }
    } else {
      console.error('ID do serviço não fornecido');
    }
  }

  recuperarUsuarioLogado() {
    const usuario = localStorage.getItem('usuarioLogado');
    if (usuario) {
      this.usuarioLogado = JSON.parse(usuario);
    }
  }

  onValueChange(value: string) {
    const parsedValue = parseFloat(value.replace('R$ ', '').replace(',', '.'));
    this.valor = isNaN(parsedValue) ? '' : parsedValue.toString();
  }

  formatarValor() {
    if (this.valor) {
      this.valor = `R$ ${parseFloat(this.valor).toFixed(2).replace('.', ',')}`;
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
