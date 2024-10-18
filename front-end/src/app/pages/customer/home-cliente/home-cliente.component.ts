import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicoStorageService } from '../../../services/servico-storage.service';
import { HeaderClienteComponent } from '../../../material/header-cliente/header-cliente.component';
import { NavbarClienteComponent } from '../../../material/navbar-cliente/navbar-cliente.component';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home-cliente',
  standalone: true,
  imports: [HeaderClienteComponent, NavbarClienteComponent, CommonModule],
  providers: [DatePipe],
  templateUrl: './home-cliente.component.html',
  styleUrl: './home-cliente.component.css'
})
export class HomeClienteComponent {
  servicos: any[] = [];

  constructor(private servicoStorage: ServicoStorageService, private router: Router, private datePipe: DatePipe) { }

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
    const dataAtual = new Date();
    const dataFormatada = this.datePipe.transform(dataAtual, 'd/M/yy HH:mm');
    this.servicoStorage.updateServico(id, { status: "ORÇADA", dataRecuperacao: dataFormatada});
    this.servicos = this.servicoStorage.getServicos();
  }
  pagarServico(id: string) {
    this.router.navigate([`cliente/home/pagamento/${id}`]);
  }
  visualizarServico(id: string) {
  }
}
