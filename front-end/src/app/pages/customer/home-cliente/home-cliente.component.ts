import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HeaderClienteComponent } from '../../../material/header-cliente/header-cliente.component';
import { NavbarClienteComponent } from '../../../material/navbar-cliente/navbar-cliente.component';

@Component({
  selector: 'app-home-cliente',
  standalone: true,
  imports: [HeaderClienteComponent,NavbarClienteComponent,CommonModule],
  templateUrl: './home-cliente.component.html',
  styleUrl: './home-cliente.component.css'
})
export class HomeClienteComponent {
    servicos = [
      { id: '001', data: '15/09/24 10:00', descricao: 'Equipamento A com falha...', status: 'ORÇADA', acao: 'aprovar' },
      { id: '002', data: '14/09/24 09:30', descricao: 'Equipamento B com defeito...', status: 'APROVADA', acao: 'visualizar' },
      { id: '003', data: '13/09/24 08:45', descricao: 'Equipamento C reiniciando...', status: 'REJEITADA', acao: 'resgatar' },
      { id: '004', data: '12/09/24 11:15', descricao: 'Equipamento D sem energia...', status: 'ARRUMADA', acao: 'pagar' },
      { id: '005', data: '13/09/24 08:45', descricao: 'Equipamento C reiniciando...', status: 'REJEITADA', acao: 'resgatar' },
      { id: '006', data: '13/09/24 08:45', descricao: 'Equipamento C reiniciando...', status: 'REJEITADA', acao: 'resgatar' },
      { id: '007', data: '13/09/24 08:45', descricao: 'Equipamento C reiniciando...', status: 'REJEITADA', acao: 'resgatar' },
      { id: '008', data: '13/09/24 08:45', descricao: 'Equipamento C reiniciando...', status: 'REJEITADA', acao: 'resgatar' },
      { id: '009', data: '13/09/24 08:45', descricao: 'Equipamento C reiniciando...', status: 'REJEITADA', acao: 'resgatar' },
      { id: '010', data: '13/09/24 08:45', descricao: 'Equipamento C reiniciando...', status: 'REJEITADA', acao: 'resgatar' },
      { id: '011', data: '13/09/24 08:45', descricao: 'Equipamento C reiniciando...', status: 'REJEITADA', acao: 'resgatar' },
      { id: '012', data: '13/09/24 08:45', descricao: 'Equipamento C reiniciando...', status: 'REJEITADA', acao: 'resgatar' },
    ];
    mostrarOrcamento(id: string) {
      console.log(`Aprovar/Rejeitar serviço para ID ${id}`);
    }
    mostrarDetalhes(id: string) {
      console.log(`Visualizar detalhes do serviço ID ${id}`);
    }
    resgatarServico(id: string) {
      console.log(`Resgatar serviço com ID ${id}`);
    }
    pagarServico(id: string) {
      console.log(`Pagar serviço com ID ${id}`);
    }
}
