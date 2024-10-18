import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServicoStorageService } from '../../../services/servico-storage.service';
import { HeaderClienteComponent } from '../../../material/header-cliente/header-cliente.component';
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [HeaderClienteComponent,CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  constructor(private servicoStorage: ServicoStorageService, private route: ActivatedRoute, private router: Router) { }
  servicos: any[] = [];
  item: any;
  ngOnInit() {
    this.servicos = this.servicoStorage.getServicos();
    const id = this.route.snapshot.paramMap.get('id');
    const escolhido = this.servicos.filter(s => s.id === id);
    this.item = escolhido[0];
  }

}
