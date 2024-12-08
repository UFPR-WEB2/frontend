import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderClienteComponent } from '../../../material/header-cliente/header-cliente.component';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../services/api/auth.service';
import { MaintenceRequest } from '../../../models/maintence-request.model';
import { StatusEnum } from '../../../config/status';
import { MaintenanceService } from '../../../services/api/maintenance.service';
import { CrudCategoriaService } from '../../../services/api/crud-categoria.service';

@Component({
  selector: 'app-solic-manutencao-cliente',
  standalone: true,
  imports: [HeaderClienteComponent, ReactiveFormsModule, CommonModule],
  providers: [DatePipe],
  templateUrl: './solic-manutencao-cliente.component.html',
  styleUrl: './solic-manutencao-cliente.component.css'
})
export class SolicManutencaoClienteComponent {
  solicForm: FormGroup;
  usuarioLogado: any;
  categorias : any;
  protected novo: any
  
  constructor(private fb: FormBuilder, private router: Router, private authService : AuthService, private maintenanceService : MaintenanceService,private categoriaService :CrudCategoriaService) {
    this.solicForm = this.fb.group({
      equipmentDescription: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(200)]],
      defectDescription: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(30)]],
      equipmentCategory: ['', [Validators.required]]
    });
  }

  get equipmentDescription() {
    return this.solicForm.get('equipmentDescription');
  }
  get equipmentCategory() {
    return this.solicForm.get('equipmentCategory');
  }
  get defectDescription() {
    return this.solicForm.get('defectDescription');
  }

  ngOnInit(): void {
    this.loadCategorias();
  }

  loadCategorias(): void {
    this.categoriaService.getCategorias().subscribe(
      (data) => {
        this.categorias = data;  
      },
      (error) => {
        console.error('Erro ao carregar categorias', error);
      }
    );
  }

  onSubmit() {
    if (this.solicForm.valid) {
      const newRequest: MaintenceRequest = {
        descricaoEquipamento: this.equipmentDescription?.value,
        descricaoDefeito: this.defectDescription?.value,
        nomeCategoria: this.equipmentCategory?.value,
        status: StatusEnum.ABERTA,
      };
      //this.maintenanceService.createMaintenance(newRequest);
      this.maintenanceService.createMaintenance(newRequest).subscribe({
        next: (response) => console.log('Requisição bem-sucedida:', response),
        error: (error) => console.error('Erro ao criar manutenção:', error),
      });
      
      this.router.navigate(['/cliente/home'])
    } else {
      this.solicForm.markAllAsTouched();
    }
  }
}
