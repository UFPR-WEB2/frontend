import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ServicoStorageService } from '../../../services/servico-storage.service';
import { HeaderClienteComponent } from '../../../material/header-cliente/header-cliente.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-efetuar-manutencao',
  standalone: true,
  imports: [HeaderClienteComponent, CommonModule, FormsModule],
  templateUrl: './efetuar-manutencao.component.html',
  styleUrl: './efetuar-manutencao.component.css',
  providers: [DatePipe]
})
export class EfetuarManutencaoComponent {
  item: any;
  servicos: any[] = [];
  perfis: any[] = [];
  cliente: any;
  valor: string = '';
  usuarioLogado: any;
  mostrarFormulario: boolean = false;
  descricaoManutencao: string = '';
  orientacoesCliente: string = '';

  constructor(
    private servicoStorage: ServicoStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) { }

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

  escolherOutroFuncionario(): any {
    let funcionarios = this.servicoStorage.getPerfis().filter(f => f.funcao === 'funcionario');
    const outroFuncionario = funcionarios.filter(f => f.nome !== this.usuarioLogado.nome)[0];
    return outroFuncionario || null;
  }

  redirecionar() {
    const confirmacao = window.confirm('Você tem certeza que deseja redirecionar este serviço para outro funcionário?');
    if (confirmacao) {
      const outroFuncionario = this.escolherOutroFuncionario();
      if (outroFuncionario) {
        const dadosAtualizados = {
          status: 'REDIRECIONADA',
          funcionario: outroFuncionario.nome
        };
        window.alert('Serviço redirecionado com sucesso!');
        this.servicoStorage.updateServico(this.item.id, dadosAtualizados);
        this.router.navigate(['/funcionario/home']);
      } else {
        window.alert('Nenhum outro funcionário disponível para redirecionar.');
      }
    }
  }

  efetuarManutencao() {
    this.mostrarFormulario = true;
  }

  onSubmit() {
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
    }
  }
}
