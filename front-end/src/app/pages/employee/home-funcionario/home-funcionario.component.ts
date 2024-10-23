import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicoStorageService } from '../../../services/servico-storage.service';
import { HeaderClienteComponent } from '../../../material/header-cliente/header-cliente.component';
import { NavbarClienteComponent } from '../../../material/navbar-cliente/navbar-cliente.component';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home-funcionario',
  standalone: true,
  imports: [HeaderClienteComponent, NavbarClienteComponent, CommonModule],
  providers: [DatePipe],
  templateUrl: './home-funcionario.component.html',
  styleUrls: ['./home-funcionario.component.css'] // Corrigido para styleUrls
})
export class HomeFuncionarioComponent {
  servicos: any[] = [];
  usuarioLogado: any;

  constructor(private servicoStorage: ServicoStorageService, private router: Router, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.recuperarUsuarioLogado();
    this.servicos = this.servicoStorage.getServicos().filter(s => s.funcionario === this.usuarioLogado.nome);
  }

  recuperarUsuarioLogado() {
    const usuario = localStorage.getItem('usuarioLogado');
    if (usuario) {
      this.usuarioLogado = JSON.parse(usuario);
    }
  }

  Efetuaorcamento(id: string) {
    this.router.navigate([`/employee/efetuar-orcamento/${id}`]);
  }
}
