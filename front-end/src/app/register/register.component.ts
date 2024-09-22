import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  addressForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.addressForm = this.fb.group({
      email : ['',Validators.required],
      phone : ['',Validators.required],
      cpf: ['', Validators.required],
      cep: ['', Validators.required],
      country: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required]
    });
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
  formataTel(){
    const phone = this.addressForm.get('phone')?.value.replace(/[^0-9]/g, "");
    const phoneFormatado = `(${phone.substr(0, 2)})${phone.substr(2, 5)}-${phone.substr(7, 4)}`;
    this.addressForm.patchValue({
      phone: phoneFormatado
    });
  }
  formatarCPF(){
      const cpf = this.addressForm.get('cpf')?.value.replace(/[^0-9]/g, "");
      const cpfFormatado = `${cpf.substr(0, 3)}.${cpf.substr(3, 3)}.${cpf.substr(6, 3)}-${cpf.substr(9, 2)}`;
      this.addressForm.patchValue({
        cpf: cpfFormatado
      });
  }
  fetchCepData() {
    const cep = this.addressForm.get('cep')?.value.replace(/[^0-9]/g, "");
    const cepFormatado = `${cep.substr(0, 5)}-${cep.substr(5, 3)}`;
    if (cep && this.addressForm.get('cep')?.valid) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
          if (!data.erro) {
            this.addressForm.patchValue({
              country:'Brasil',
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
    if (this.addressForm.valid) {
      console.log(this.addressForm.value);
    }
  }
}

