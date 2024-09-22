import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, this.cpfValidatorAndFormatter()]],
      phone: ['', [Validators.required, this.phoneValidatorAndFormatter()]],
      cep: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      complemento: ['', Validators.required]
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

  fetchCepData() {
    const cep = this.registerForm.get('cep')?.value.replace(/[^0-9]/g, "");
    const cepFormatado = `${cep.substr(0, 5)}-${cep.substr(5, 3)}`;
    if (cep && this.registerForm.get('cep')?.valid) {
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
          }
        });
    }
  }

  onSubmit() {
    console.log(this.registerForm.get('name')?.errors);
  }
}
