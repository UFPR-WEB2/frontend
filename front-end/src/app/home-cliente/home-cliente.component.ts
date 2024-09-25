import { Component } from '@angular/core';
import { HeaderClienteComponent } from '../header-cliente/header-cliente.component';
import { NavClienteComponent } from "../nav-cliente/nav-cliente.component";
@Component({
  selector: 'app-home-cliente',
  standalone: true,
  imports: [HeaderClienteComponent, NavClienteComponent],
  templateUrl: './home-cliente.component.html',
  styleUrl: './home-cliente.component.css'
})
export class HomeClienteComponent {

}
