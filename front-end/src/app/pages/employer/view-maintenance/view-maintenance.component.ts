import { Component } from '@angular/core';
import { ProductComponent } from '../../../material';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-maintenance',
  standalone: true,
  imports: [ProductComponent, CommonModule],
  templateUrl: './view-maintenance.component.html',
  styleUrls: ['./view-maintenance.component.css']
})
export class ViewMaintenanceComponent {
  products = [
    {
      state: 'Rejeitado',
      stateClass: 'red',
      category: 'Notebook',
      date: '12/12/2023',
      description: 'Problema de superaquecimento',
      link: 'http://www.exemplo.com/detalhes/1',
    },
    {
      state: 'Aprovado',
      stateClass: 'green',
      category: 'Impressora',
      date: '10/11/2023',
      description: 'Substituição de cartucho',
    },
    {
      state: 'Em análise',
      stateClass: 'yellow',
      category: 'Monitor',
      date: '05/10/2023',
      description: 'Tela piscando ocasionalmente',
      link: 'http://www.exemplo.com/detalhes/3',
    },
    {
      state: 'Concluído',
      stateClass: 'blue',
      category: 'Teclado',
      date: '01/09/2023',
      description: 'Teclas não responsivas',

    },
  ];

}
