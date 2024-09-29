import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-register.component.html',
  styleUrl: './form-register.component.css'
})
export class FormRegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, this.cpfValidatorAndFormatter()]],
      phone: ['', [Validators.required, this.phoneValidatorAndFormatter()]],
      cep: ['', [Validators.required, this.cepValidatorAndFormatter()]],
      country: ['', Validators.required],
      state: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      numero : ['',Validators.required],
      complemento: ['',]
    });
  }

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get cpf() {
    return this.registerForm.get('cpf');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get cep() {
    return this.registerForm.get('cep');
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  phoneValidatorAndFormatter(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const phone = control.value ? control.value.replace(/[^0-9]/g, '') : '';
      if (phone.length === 11) {
        const phoneFormatado = `(${phone.substr(0, 2)})${phone.substr(2, 5)}-${phone.substr(7, 4)}`;
        if (control.value !== phoneFormatado) {
          control.setValue(phoneFormatado, { emitEvent: false });
        }
      }
      if (phone.length !== 11) {
        return { invalidPhone: true };
      }
      return null;
    };
  }

  cpfValidatorAndFormatter(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cpf = control.value ? control.value.replace(/[^0-9]/g, "") : "";
      if (cpf.length === 11) {
        const cpfFormatado = `${cpf.substr(0, 3)}.${cpf.substr(3, 3)}.${cpf.substr(6, 3)}-${cpf.substr(9, 2)}`;
        if (control.value !== cpfFormatado) {
          control.setValue(cpfFormatado, { emitEvent: false });
        }
      }
      if (cpf.length !== 11) {
        return { invalidCpf: true };
      }
      return null;
    };
  }


  clearAddressFields() {
    this.registerForm.patchValue({
      country: '',
      state: '',
      city: '',
      street: '',
      complemento: '',
    });
  }

  fetchCepData() {
    const cep = this.registerForm.get('cep')?.value.replace(/[^0-9]/g, "");
    const cepFormatado = `${cep.substr(0, 5)}-${cep.substr(5, 3)}`;
    
    if (cep && cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
          if (!data.erro) {
            this.registerForm.patchValue({
              country: 'Brasil',
              street: data.logradouro,
              city: data.localidade,
              state: data.uf,
              cep: cepFormatado
            });
          } else {
            console.log('CEP não encontrado');
            this.clearAddressFields();
          }
        })
        .catch(() => {
          console.log('Erro na requisição do CEP');
          this.clearAddressFields();
        });
    } else {
      console.log('CEP inválido');
      this.clearAddressFields();
    }
  }

  cepValidatorAndFormatter(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cep = control.value ? control.value.replace(/[^0-9]/g, "") : "";
      if (cep.length === 8) {
        const cepFormatado = `${cep.substr(0, 5)}-${cep.substr(5, 3)}`;
        if (control.value !== cepFormatado) {
          control.setValue(cepFormatado, { emitEvent: false });
        }
      }
      if (cep.length !== 8) {
        return { invalidCep: true };
      }
      return null;
    };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Formulário válido:', this.registerForm.value);
    } else {
      console.log('Formulário inválido');
      this.registerForm.markAllAsTouched();
    }
  }
}
