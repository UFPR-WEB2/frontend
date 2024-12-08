import { Component } from '@angular/core';
import { ServicoStorageService } from '../../../services/servico-storage.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HeaderClienteComponent } from '../../../material/header-cliente/header-cliente.component';
import { CommonModule } from '@angular/common';
import { MaintenanceService, MaintenanceResponse } from '../../../services/api/maintenance.service';
@Component({
  selector: 'app-view-solicitacao',
  standalone: true,
  imports: [HeaderClienteComponent,CommonModule],
  templateUrl: './view-solicitacao.component.html',
  styleUrl: './view-solicitacao.component.css'
})
export class ViewSolicitacaoComponent {
  item: any;
  servicos: MaintenanceResponse[] = [];

  constructor(private maintenanceService: MaintenanceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.maintenanceService.getMaintenanceRecords().subscribe(
      (data) => {
        this.servicos = data;
        console.log("data: " + data);
      },
      (error) => {
        console.error('Erro ao carregar solicitações', error);
      }
    );
  }
}
