import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderClienteComponent } from '../../../material/header-cliente/header-cliente.component';
import { NavbarClienteComponent } from '../../../material/navbar-cliente/navbar-cliente.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solic-manutencao-cliente',
  standalone: true,
  imports: [HeaderClienteComponent, NavbarClienteComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './solic-manutencao-cliente.component.html',
  styleUrl: './solic-manutencao-cliente.component.css'
})
export class SolicManutencaoClienteComponent {
  solicForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.solicForm = this.fb.group({
      equipmentDescription: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(200)]],
      defectDescription: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(500)]],
    });
  }

  get equipmentDescription() {
    return this.solicForm.get('equipmentDescription');
  }
  get defectDescription() {
    return this.solicForm.get('defectDescription');
  }

  onSubmit() {
    if (this.solicForm.valid) {
      console.log('Formulário válido:', this.solicForm.value);
    } else {
      console.log('Formulário inválido');
      this.solicForm.markAllAsTouched();
    }
  }
}
