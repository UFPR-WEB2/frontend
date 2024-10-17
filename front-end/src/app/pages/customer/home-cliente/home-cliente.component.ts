import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicoStorageService } from '../../../services/servico-storage.service';
import { HeaderClienteComponent } from '../../../material/header-cliente/header-cliente.component';
import { NavbarClienteComponent } from '../../../material/navbar-cliente/navbar-cliente.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-cliente',
  standalone: true,
  imports: [HeaderClienteComponent, NavbarClienteComponent, CommonModule],
  templateUrl: './home-cliente.component.html',
  styleUrl: './home-cliente.component.css'
})
export class HomeClienteComponent {
  servicos: any[] = [];

  constructor(private servicoStorage: ServicoStorageService, private router: Router) { }

  ngOnInit(): void {
    this.servicos = this.servicoStorage.getServicos();
  }

  mostrarOrcamento(id: string) {
    this.router.navigate([`/cliente/home/orcamento/${id}`]);
  }
  mostrarDetalhes(id: string) {
    console.log(`Visualizar detalhes do serviço ID ${id}`);
  }
  resgatarServico(id: string) {
    this.servicoStorage.updateServico(id, { status: "ORÇADA", acao: "aprovar" });
    this.servicos = this.servicoStorage.getServicos();
  }
  pagarServico(id: string) {
    console.log(`Pagar serviço com ID ${id}`);
  }
}
