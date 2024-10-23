import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderClienteComponent } from '../../../material/header-cliente/header-cliente.component';
import { Router } from '@angular/router';
import { ServicoStorageService } from '../../../services/servico-storage.service';
import { NavbarFuncionarioComponent } from '../../../material/navbar-funcionario/navbar-funcionario.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-visualizacao-solicitacoes',
  standalone: true,
  imports: [HeaderClienteComponent, NavbarFuncionarioComponent, CommonModule],
  templateUrl: './visualizacao-solicitacoes.component.html',
  styleUrls: ['./visualizacao-solicitacoes.component.css'],
  providers : [DatePipe]
})
export class VisualizacaoSolicitacoesComponent {

  servicos: any[] = [];
  servicosFiltrados: any[] = [];
  usuarioLogado: any;

  constructor(private servicoStorage: ServicoStorageService, private router: Router,private datePipe: DatePipe) { }

  efetuarManutencao(id: string){
    this.router.navigate([`funcionario/home/efetuar-manutencao/${id}`])
  }

  Efetuaorcamento(id: string) {
    this.router.navigate([`/funcionario/home/efetuar-orcamento/${id}`]);
  }

  finalizarSolicitacao(id: string){
    const dataAtual = new Date();
    const dataFormatada = this.datePipe.transform(dataAtual, 'd/M/yy HH:mm');
    this.servicoStorage.updateServico(id, { status: "FINALIZADA", dataFinalizacao: dataFormatada, funcionarioFinalizacao: this.usuarioLogado.nome});
    this.servicos = this.servicoStorage.getServicos();
  }

  recuperarUsuarioLogado() {
    const usuario = localStorage.getItem('usuarioLogado');
    if (usuario) {
      this.usuarioLogado = JSON.parse(usuario); 
    }
  }

  ngOnInit(): void {
    this.recuperarUsuarioLogado();
    this.servicos = this.servicoStorage.getServicos().filter(s => s.funcionario === this.usuarioLogado.nome);
    this.servicosFiltrados = this.servicos;
  }

  converterParaData(dataString: string): Date {
    const partes = dataString.split(' ');
    const [dia, mes, ano] = partes[0].split('/');
    const [hora, minuto] = partes[1].split(':');

    return new Date(Number('20' + ano), Number(mes) - 1, Number(dia), Number(hora), Number(minuto));
  }

  onFiltroAplicado(event: any) {
    const hoje = new Date();
    
    if (event.filtro === 'hoje') {
      const hoje = new Date();
      this.servicosFiltrados = this.servicos.filter(s => {
        const dataServico = this.converterParaData(s.data);
        return dataServico.toDateString() === hoje.toDateString();
      });
    } else if (event.filtro === 'periodo') {
      const dataInicio = this.converterParaData(event.dataInicio); 
      const dataFim = this.converterParaData(event.dataFim); 
      this.servicosFiltrados = this.servicos.filter(s => {
        const dataServico = this.converterParaData(s.data);
        return dataServico >= dataInicio && dataServico <= dataFim;
      });
    } else {
      this.servicosFiltrados = this.servicos;
    }
    
  }
}
