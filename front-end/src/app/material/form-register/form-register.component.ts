import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  cepValidatorAndFormatter,
  cpfValidatorAndFormatter,
  phoneValidatorAndFormatter,
} from '../../utils/validators';
import { HttpClientModule } from '@angular/common/http';
import { CustomerService } from '../../services/api/customer.service';
import { ICliente } from '../../services/api/customer.service'; // Ajuste o caminho conforme necessário

@Component({
  selector: 'app-form-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './form-register.component.html',
  styleUrl: './form-register.component.css',
  providers: [CustomerService]
})
export class FormRegisterComponent {
  registerForm: FormGroup;
  statusMessage: string = ''; 
  isSuccess: boolean = false; 
  constructor(private fb: FormBuilder, private router: Router, private customerService: CustomerService) {
    this.registerForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(150),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, cpfValidatorAndFormatter()]],
      phone: ['', [Validators.required, phoneValidatorAndFormatter()]],
      cep: ['', [Validators.required, cepValidatorAndFormatter()]],
      country: ['', Validators.required],
      state: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
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
    const cep = this.registerForm.get('cep')?.value.replace(/[^0-9]/g, '');

    if (cep && cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.erro) {
            this.registerForm.patchValue({
              country: 'Brasil',
              street: data.logradouro,
              city: data.localidade,
              state: data.uf,
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

  onSubmit() {
    if (this.registerForm.valid) {
      const formValues = this.registerForm.value;

      const cliente: ICliente = {
        nome: formValues.name,
        email: formValues.email,
        cpf: formValues.cpf.replace(/\D/g, ''),
        telefone: formValues.phone.replace(/\D/g, ''),
        cep: formValues.cep.replace(/\D/g, ''),
        pais: formValues.country,
        estado: formValues.state,
        cidade: formValues.city,
        rua: formValues.street,
        numero: formValues.numero,
        complemento: formValues.complemento || '',
      };

      this.customerService.cadastrarCliente(cliente).subscribe(
        (response) => {
          this.statusMessage = 'Cliente cadastrado com sucesso!';
          this.isSuccess = true;
          this.goToLogin();
        },
        (error) => {
          this.statusMessage = error;
          this.isSuccess = false; 
        }
      );
    } else {
      this.registerForm.markAllAsTouched();
      this.statusMessage = 'Por favor, preencha todos os campos corretamente.';
      this.isSuccess = false;
    }
  }
}