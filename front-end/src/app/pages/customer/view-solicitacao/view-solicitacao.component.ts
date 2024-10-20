import { Component } from '@angular/core';
import { ServicoStorageService } from '../../../services/servico-storage.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HeaderClienteComponent } from '../../../material/header-cliente/header-cliente.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-view-solicitacao',
  standalone: true,
  imports: [HeaderClienteComponent,CommonModule],
  templateUrl: './view-solicitacao.component.html',
  styleUrl: './view-solicitacao.component.css'
})
export class ViewSolicitacaoComponent {
  item: any;
  servicos: any[] = [];

  constructor(private servicoStorage: ServicoStorageService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.servicos = this.servicoStorage.getServicos();
    const id = this.route.snapshot.paramMap.get('id');
    const escolhido = this.servicos.filter(s => s.id === id);
    this.item = escolhido[0];
    console.log(escolhido);
  }
}
