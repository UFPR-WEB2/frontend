import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderClienteComponent } from '../../../material/header-cliente/header-cliente.component';
import { NavbarClienteComponent } from '../../../material/navbar-cliente/navbar-cliente.component';
import { Router } from '@angular/router';
import { ServicoStorageService } from '../../../services/servico-storage.service';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../services/api/auth.service';

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
  protected novo: any
  
  constructor(private fb: FormBuilder, private router: Router, private servicoStorage: ServicoStorageService, private datePipe: DatePipe, private authService : AuthService) {
    this.solicForm = this.fb.group({
      equipmentDescription: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(200)]],
      defectDescription: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(500)]],
      equipmentCategory: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.recuperarUsuarioLogado();
    this.authService.getSession().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error("Erro ao obter sessão:", error);
      }
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

  recuperarUsuarioLogado() {
    const usuario = localStorage.getItem('usuarioLogado');
    if (usuario) {
      this.usuarioLogado = JSON.parse(usuario);
    }
  }

  onSubmit() {
    if (this.solicForm.valid) {
      console.log('Formulário válido:', this.solicForm.value);
      const descEquipamento = this.equipmentDescription?.value;
      const descErro = this.defectDescription?.value;
      const category = this.equipmentCategory?.value;
      const dataAtual = new Date();
      const dataFormatada = this.datePipe.transform(dataAtual, 'd/M/yy HH:mm');
      const id = Math.floor(Math.random() * 20000);
      this.novo = { id: `${id}`, data: dataFormatada, descricaoEquipamento: descEquipamento, descricaoErro: descErro, status: 'ABERTA', categoria: category, cliente: this.usuarioLogado.nome, funcionario: 'Maria' };
      this.servicoStorage.addServico(this.novo)
      this.router.navigate(['/cliente/home'])
    } else {
      console.log('Formulário inválido');
      this.solicForm.markAllAsTouched();
    }
  }
}
