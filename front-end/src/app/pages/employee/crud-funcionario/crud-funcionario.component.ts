import { Component, ViewChild, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ServicoStorageService } from '../../../services/servico-storage.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  EmployeeService,
  Employee,
} from '../../../services/api/employee.service';

@Component({
  selector: 'app-crud-funcionario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crud-funcionario.component.html',
  styleUrl: './crud-funcionario.component.css',
})
export class CrudFuncionarioComponent implements OnInit {
  @ViewChild('formFuncionario') formFuncionario!: NgForm;

  funcionarios: Employee[] = [];

  modalEditar = false;
  modalExcluir = false;
  pessoaParaExcluir: any = null;

  pessoa = {
    id: new Date().getTime(),
    nome: '',
    senha: '',
    email: '',
    dataNascimento: '',
    ativo: 'ativo',
  };

  pessoaEditar = {
    id: new Date().getTime(),
    nome: '',
    senha: '',
    email: '',
    dataNascimento: '',
    ativo: 'ativo',
  };

  constructor(private employeeService: EmployeeService) {}

  atualizarListaFuncionarios() {
    this.employeeService.listarFuncionarios().subscribe(
      (data) => {
        this.funcionarios = data;
      },
      (error) => {
        console.error('Erro ao carregar Funcionarios', error);
      }
    );
  }

  ngOnInit(): void {
    this.atualizarListaFuncionarios();
  }

  inserir() {
    if (this.formFuncionario.valid) {
      this.employeeService.cadastrarFuncionario(this.pessoa).subscribe(
        () => {
          this.atualizarListaFuncionarios();
        },
        (error) => {
          if (error.status === 409) {
            console.log(error);
            alert('Email já cadastrado.');
          }
        }
      );
      this.pessoa = {
        id: new Date().getTime(),
        nome: '',
        senha: '',
        email: '',
        dataNascimento: '',
        ativo: 'ativo',
      };
      this.formFuncionario.resetForm();
    }
  }

  abrirModalExcluir(funcionario: any) {
    if (this.funcionarios.length > 1) {
      this.pessoaParaExcluir = funcionario;
      this.modalExcluir = true;
    } else {
      alert('Não é possível excluir o último funcionário.');
    }
  }

  fecharModalExcluir() {
    this.modalExcluir = false;
    this.pessoaParaExcluir = null;
  }

  confirmarExcluirFuncionario() {
    if (this.pessoaParaExcluir) {
      this.employeeService
        .deletarFuncionario(this.pessoaParaExcluir.id)
        .subscribe(
          () => {
            this.atualizarListaFuncionarios();
            this.fecharModalExcluir();
          },
          (error) => {
            if (error.status === 403) {
              alert('Não é possível excluir si mesmo.');
            }
          }
        );
    }
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
      dataNascimento: '',
      ativo: 'ativo',
    };
  }

  atualizarFuncionario() {
    this.employeeService
      .atualizarFuncionario(this.pessoaEditar.id, this.pessoaEditar)
      .subscribe(() => {
        this.atualizarListaFuncionarios();
      });
    this.pessoa = {
      id: new Date().getTime(),
      nome: '',
      senha: '',
      email: '',
      dataNascimento: '',
      ativo: 'ativo',
    };
    this.modalEditar = false;
  }
}
