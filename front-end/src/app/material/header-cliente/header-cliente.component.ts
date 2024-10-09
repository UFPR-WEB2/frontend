import { Component,Input  } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-header-cliente',
  standalone: true,
  imports: [],
  templateUrl: './header-cliente.component.html',
  styleUrl: './header-cliente.component.css'
})
export class HeaderClienteComponent {
  @Input() titulo: string = 'Manutenção de Equipamentos';
  @Input() nomeCliente: string = 'Nome do Cliente';
  @Input() emailCliente: string = 'emailDoCliente@gmail.com';

  constructor(private router: Router) {}
  goToMenu() {
    this.router.navigate(['']);
  }
}
