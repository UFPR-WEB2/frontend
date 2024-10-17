import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ServicoStorageService } from '../../../services/servico-storage.service';
import { HeaderClienteComponent } from '../../../material/header-cliente/header-cliente.component';

@Component({
  selector: 'app-orcamento-cliente',
  standalone: true,
  imports: [HeaderClienteComponent, CommonModule],
  templateUrl: './orcamento-cliente.component.html',
  styleUrl: './orcamento-cliente.component.css'
})
export class OrcamentoClienteComponent {
  item: any;
  servicos: any[] = [];

  constructor(private servicoStorage: ServicoStorageService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.servicos = this.servicoStorage.getServicos();
    const id = this.route.snapshot.paramMap.get('id');
    const escolhido = this.servicos.filter(s => s.id === id);
    this.item = escolhido[0];
  }

  aprovarServico() {
    const dadosAtualizados = { status: 'APROVADA', acao: 'visualizar' };
    this.servicoStorage.updateServico(this.item.id, dadosAtualizados);
    this.router.navigate(['/cliente/home']);
  }

  rejeitarServico() {
    const dadosAtualizados = { status: 'REJEITADA', acao: 'visualizar' };
    this.servicoStorage.updateServico(this.item.id, dadosAtualizados);
    this.router.navigate(['/cliente/home']);
  }


}
