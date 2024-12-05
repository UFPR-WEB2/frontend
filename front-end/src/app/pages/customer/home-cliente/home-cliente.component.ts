import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicoStorageService } from '../../../services/servico-storage.service';
import { HeaderClienteComponent } from '../../../material/header-cliente/header-cliente.component';
import { NavbarClienteComponent } from '../../../material/navbar-cliente/navbar-cliente.component';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../services/api/auth.service';

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
  usuarioLogado: any;

  constructor(private servicoStorage: ServicoStorageService, private router: Router, private datePipe: DatePipe, private authService : AuthService) { }

  ngOnInit(): void {
    //this.recuperarUsuarioLogado();
    this.authService.getSession().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error("Erro ao obter sessão:", error);
      }
    });
  }

  recuperarUsuarioLogado() {
    const usuario = sessionStorage.getItem('user');
    if (usuario) {
      this.usuarioLogado = JSON.parse(usuario); 
    }
  }

  mostrarOrcamento(id: string) {
    this.router.navigate([`/cliente/home/orcamento/${id}`]);
  }
  visualizarServico(id: string) {
    this.router.navigate([`/cliente/home/servico/${id}`]);
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
}
