import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ServicoStorageService } from '../../../services/servico-storage.service';
import { HeaderClienteComponent } from '../../../material/header-cliente/header-cliente.component';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-efetuar-orcamento',
  standalone: true,
  imports: [HeaderClienteComponent, CommonModule, FormsModule],
  templateUrl: './efetuar-orcamento.component.html',
  styleUrl: './efetuar-orcamento.component.css'
})
export class EfetuarOrcamentoComponent {
  item: any;
  servicos: any[] = [];
  perfis: any[] = [];
  cliente: any;
  valor: string = '';
  usuarioLogado: any;
  
  constructor(private servicoStorage: ServicoStorageService, private route: ActivatedRoute, private router: Router, private datePipe: DatePipe) { }

  ngOnInit() {
    this.recuperarUsuarioLogado();

    const id = this.route.snapshot.paramMap.get('id');
    this.servicos = this.servicoStorage.getServicos();
    const escolhido = this.servicos.filter(s => s.id === id);
    this.item = escolhido[0];

    this.perfis = this.servicoStorage.getPerfis();
    const clienteCriador = this.perfis.find(p => p.nome === this.item.cliente);
    this.cliente = clienteCriador;
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
          const dataAtual = new Date();
          const dataFormatada = this.datePipe.transform(dataAtual, 'd/M/yy HH:mm');
          const dadosAtualizados = {
            status: 'ORÇADA',
            preco : valorSemMascara,
            dataOrcamento : dataFormatada
          };
          window.alert('Serviço Rejeitado');
          this.servicoStorage.updateServico(this.item.id, dadosAtualizados);
          this.router.navigate(['/cliente/home']);
        }
      } else {
        console.error("Valor não pode ser nulo");
      }
    }
  }
}
