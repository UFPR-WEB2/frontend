import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderClienteComponent } from '../../../material/header-cliente/header-cliente.component';
import { NavbarClienteComponent } from '../../../material/navbar-cliente/navbar-cliente.component';
import { Router } from '@angular/router';
import { ServicoStorageService } from '../../../services/servico-storage.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-solic-manutencao-cliente',
  standalone: true,
  imports: [HeaderClienteComponent, NavbarClienteComponent, ReactiveFormsModule, CommonModule],
  providers: [DatePipe],
  templateUrl: './solic-manutencao-cliente.component.html',
  styleUrl: './solic-manutencao-cliente.component.css'
})
export class SolicManutencaoClienteComponent {
  solicForm: FormGroup;

  protected novo: any

  constructor(private fb: FormBuilder, private router: Router, private servicoStorage: ServicoStorageService, private datePipe: DatePipe) {
    this.solicForm = this.fb.group({
      equipmentDescription: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(200)]],
      defectDescription: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(500)]],
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

  onSubmit() {
    if (this.solicForm.valid) {
      console.log('Formulário válido:', this.solicForm.value);
      const descEquipamento = this.equipmentDescription?.value;
      const descErro = this.defectDescription?.value;
      const category = this.equipmentCategory?.value;
      const dataAtual = new Date();
      const dataFormatada = this.datePipe.transform(dataAtual, 'd/M/yy HH:mm');
      const id = Math.floor(Math.random() * 20000);
      this.novo = { id: id, data: dataFormatada, descricaoEquipamento: descEquipamento, descricaoErro: descErro, status: 'ABERTA', categoria: category, cliente: 'João', funcionario: 'Maria' };
      this.servicoStorage.addServico(this.novo)
      this.router.navigate(['/cliente/home'])
    } else {
      console.log('Formulário inválido');
      this.solicForm.markAllAsTouched();
    }
  }
}
