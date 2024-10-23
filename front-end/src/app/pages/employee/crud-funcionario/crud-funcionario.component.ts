import { Component, ViewChild, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ServicoStorageService } from '../../../services/servico-storage.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-crud-funcionario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crud-funcionario.component.html',
  styleUrl: './crud-funcionario.component.css'
})

export class CrudFuncionarioComponent implements OnInit {

  @ViewChild('formFuncionario') formFuncionario! : NgForm;

  funcionarios: any[] = [];

  modalEditar = false;

  pessoa = {
    id: new Date().getTime(),
    nome: '',
    senha: '',
    email: '',
    nascimento: '',
    funcao: 'funcionario',
    status: 'ativo',
  };

  pessoaEditar = {
    id: new Date().getTime(),
    nome: '',
    senha: '',
    email: '',
    nascimento: '',
    funcao: 'funcionario',
    status: 'ativo',
  };


  constructor(private servicoStorageService: ServicoStorageService) {
    this.funcionarios = this.servicoStorageService.getPerfis();
  }

  atualizarListaFuncionarios() {
    const perfis = this.servicoStorageService.getPerfis();
    this.funcionarios = perfis.filter(perfil => perfil.funcao === 'funcionario');
  }

  ngOnInit(): void {
    this.atualizarListaFuncionarios();
  }

  inserir() {
    if (this.formFuncionario.valid) {
      this.servicoStorageService.addCliente(this.pessoa);
      this.atualizarListaFuncionarios();
      this.pessoa = {
        id: new Date().getTime(),
        nome: '',
        senha: '',
        email: '',
        nascimento: '',
        funcao: 'funcionario',
        status: 'ativo',
      };
      this.formFuncionario.resetForm();
    }
  }

  deleteFuncionario(id: string) {
    this.servicoStorageService.deleteCliente(id);
    this.atualizarListaFuncionarios();
  }
  
  abrirModalEditar(funcionario: any) {
    this.pessoaEditar = { ...funcionario };
    this.modalEditar = true;
  }

  fecharModalEditar() {
    this.modalEditar = false;
    this.pessoa = {
      id: new Date().getTime(),
      nome: '',
      senha: '',
      email: '',
      nascimento: '',
      funcao: 'funcionario',
      status: 'ativo',
    };
  }

  atualizarFuncionario() {
    this.servicoStorageService.updateCliente(this.pessoaEditar.id, this.pessoaEditar);
    console.log(this.pessoa);
    this.atualizarListaFuncionarios();
    this.pessoa = {
      id: new Date().getTime(),
      nome: '',
      senha: '',
      email: '',
      nascimento: '',
      funcao: 'funcionario',
      status: 'ativo',
    };
    this.modalEditar = false;
  }

}
