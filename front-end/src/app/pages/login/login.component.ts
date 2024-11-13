import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicoStorageService } from '../../services/servico-storage.service';
import { HeaderClienteComponent } from '../../material/header-cliente/header-cliente.component';
import { ButtonComponent } from "../../material";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderClienteComponent, ButtonComponent, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private router: Router, private servicoStorage: ServicoStorageService) {}

  ngOnInit() {
    this.servicoStorage.initializePerfis();
  }

  goToRegister() {
    this.router.navigate(['/login/register']);
  }

  goToHomeCliente() {
    this.router.navigate(['/cliente/home']);
  }
  goToHomeFuncionario() {
    this.router.navigate(['/funcionario/home']);
  }

  onLogin() {
    if (!this.email || !this.password) {
      alert('É necessário preencher todos os campos.');
      return;
    }
    
    console.log(this.email);
    const usuarios = this.servicoStorage.getPerfis();
    const usuario = usuarios.find(u => u.email === this.email && u.senha === this.password);

    if (usuario) {
      localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
      if(usuario.funcao === 'cliente'){
        this.goToHomeCliente();
      }else{
        this.goToHomeFuncionario();
      }

    } else {
      alert('Credenciais inválidas');
    }
  }

}
