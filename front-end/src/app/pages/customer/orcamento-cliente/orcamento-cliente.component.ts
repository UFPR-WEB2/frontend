import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ActivatedRoute } from '@angular/router';
import { HeaderClienteComponent } from '../../../material/header-cliente/header-cliente.component';

@Component({
  selector: 'app-orcamento-cliente',
  standalone: true,
  imports: [HeaderClienteComponent,CommonModule],
  templateUrl: './orcamento-cliente.component.html',
  styleUrl: './orcamento-cliente.component.css'
})
export class OrcamentoClienteComponent {
  item : any;
  servicos = [
    { id: '001', data: '15/09/24 10:00', descricao: 'Equipamento A com falha...', status: 'ORÇADA', acao: 'aprovar', categoria: 'Desktop', defeito: 'Falha de hardware', preco: 1500.00 },
    { id: '002', data: '14/09/24 09:30', descricao: 'Equipamento B com defeito...', status: 'APROVADA', acao: 'visualizar', categoria: 'Notebook', defeito: 'Bateria não carrega', preco: 800.00 },
    { id: '003', data: '13/09/24 08:45', descricao: 'Equipamento C reiniciando...', status: 'REJEITADA', acao: 'resgatar', categoria: 'Notebook', defeito: 'Sistema operacional corrompido', preco: 600.00 },
    { id: '004', data: '12/09/24 11:15', descricao: 'Equipamento D sem energia...', status: 'ARRUMADA', acao: 'pagar', categoria: 'Impressora', defeito: 'Problema de fonte de energia', preco: 300.00 },
    { id: '005', data: '13/09/24 08:45', descricao: 'Equipamento E reiniciando...', status: 'ORÇADA', acao: 'aprovar', categoria: 'Mouse', defeito: 'Botão esquerdo quebrado', preco: 50.00 },
    { id: '006', data: '13/09/24 08:45', descricao: 'Equipamento F reiniciando...', status: 'REJEITADA', acao: 'resgatar', categoria: 'Teclado', defeito: 'Teclas não respondem', preco: 100.00 },
    { id: '007', data: '13/09/24 08:45', descricao: 'Equipamento G reiniciando...', status: 'ORÇADA', acao: 'aprovar', categoria: 'Desktop', defeito: 'Placa-mãe queimada', preco: 1200.00 },
    { id: '008', data: '13/09/24 08:45', descricao: 'Equipamento H reiniciando...', status: 'REJEITADA', acao: 'resgatar', categoria: 'Teclado', defeito: 'Problema com conexão USB', preco: 80.00 },
    { id: '009', data: '13/09/24 08:45', descricao: 'Equipamento I reiniciando...', status: 'REJEITADA', acao: 'resgatar', categoria: 'Notebook', defeito: 'Problema no disco rígido', preco: 700.00 },
    { id: '010', data: '13/09/24 08:45', descricao: 'Equipamento J reiniciando...', status: 'REJEITADA', acao: 'resgatar', categoria: 'Impressora', defeito: 'Cartucho não reconhecido', preco: 150.00 },
    { id: '011', data: '13/09/24 08:45', descricao: 'Equipamento K reiniciando...', status: 'REJEITADA', acao: 'resgatar', categoria: 'Outros', defeito: 'Problema desconhecido', preco: 200.00 },
    { id: '012', data: '13/09/24 08:45', descricao: 'Equipamento C reiniciando...', status: 'REJEITADA', acao: 'resgatar', categoria: 'Notebook', defeito: 'Sistema operacional corrompido', preco: 600.00 },
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const escolhido = this.servicos.filter(s => s.id === id);
    this.item = escolhido[0];
  }


}
