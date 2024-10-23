import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicoStorageService } from '../../../services/servico-storage.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-crud-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crud-categoria.component.html',
  styleUrls: ['./crud-categoria.component.css']
})
export class CrudCategoriaComponent implements OnInit {
  categories: string[] = [];
  newCategory: string = '';
  editedCategory: string = '';
  categoryBeingEdited: string | null = null;
  isEditModalOpen: boolean = false;

  constructor(private servicoStorage: ServicoStorageService) {}

  ngOnInit(): void {
    this.loadServicos();
    this.loadClientes();
    this.loadCategorias();
  }

  // Serviços
  servicos: any[] = [];
  novoServico: any = { descricaoEquipamento: '', descricaoErro: '', preco: '' };
  editedServico: any = { id: null, descricaoEquipamento: '', descricaoErro: '', preco: '' };
  isEditServicoModalOpen: boolean = false;

  loadServicos(): void {
    this.servicos = this.servicoStorage.getServicos();
  }

  addServico(): void {
    if (this.novoServico.descricaoEquipamento.trim() && this.novoServico.descricaoErro.trim() && this.novoServico.preco.trim()) {
      const novoServico = {
        id: new Date().getTime(),
        descricaoEquipamento: this.novoServico.descricaoEquipamento.trim(),
        descricaoErro: this.novoServico.descricaoErro.trim(),
        preco: this.novoServico.preco.trim(),
        status: 'ABERTA',
      };

      this.servicoStorage.addServico(novoServico);
      this.novoServico = { descricaoEquipamento: '', descricaoErro: '', preco: '' };
      this.loadServicos();
    }
  }

  editServico(servico: any): void {
    this.editedServico = { ...servico };
    this.isEditServicoModalOpen = true;
  }

  updateServico(id: number): void {
    if (this.editedServico.descricaoEquipamento.trim() && this.editedServico.descricaoErro.trim() && this.editedServico.preco.trim()) {
      this.servicoStorage.updateServico(id.toString(), this.editedServico);
      this.closeEditServicoModal();
      this.loadServicos();
    }
  }

  deleteServico(id: number): void {
    this.servicoStorage.deleteServico(id.toString());
    this.loadServicos();
  }

  closeEditServicoModal(): void {
    this.isEditServicoModalOpen = false;
    this.editedServico = { id: null, descricaoEquipamento: '', descricaoErro: '', preco: '' };
  }

  // Clientes
  clientes: any[] = [];
  novoCliente: any = { nome: '', email: '', senha: '' };
  editedCliente: any = { id: null, nome: '', email: '', senha: '' };
  isEditClienteModalOpen: boolean = false;

  loadClientes(): void {
    this.clientes = this.servicoStorage.getPerfis();
  }

  addCliente(): void {
    if (this.novoCliente.nome.trim() && this.novoCliente.email.trim() && this.novoCliente.senha.trim()) {
      const novoCliente = {
        id: new Date().getTime(),
        nome: this.novoCliente.nome.trim(),
        email: this.novoCliente.email.trim(),
        senha: this.novoCliente.senha.trim(),
      };

      this.servicoStorage.addCliente(novoCliente);
      this.novoCliente = { nome: '', email: '', senha: '' };
      this.loadClientes();
    }
  }

  editCliente(cliente: any): void {
    this.editedCliente = { ...cliente };
    this.isEditClienteModalOpen = true;
  }

  updateCliente(id: number): void {
    if (this.editedCliente.nome.trim() && this.editedCliente.email.trim() && this.editedCliente.senha.trim()) {
      this.servicoStorage.updateCliente(id, this.editedCliente);
      this.closeEditClienteModal();
      this.loadClientes();
    }
  }

  deleteCliente(id: number): void {
    this.servicoStorage.deleteCliente(id.toString());
    this.loadClientes();
  }

  closeEditClienteModal(): void {
    this.isEditClienteModalOpen = false;
    this.editedCliente = { id: null, nome: '', email: '', senha: '' };
  }

  // Categorias
  categorias: string[] = [];
  novaCategoria: string = '';
  categoriaEditada: string = '';
  categoriaSendoEditada: string | null = null;
  isEditCategoriaModalOpen: boolean = false;

  loadCategorias(): void {
    this.categorias = this.servicoStorage.getCategorias();
  }

  addCategoria(): void {
    if (this.novaCategoria.trim()) {
      this.servicoStorage.addCategoria(this.novaCategoria.trim());
      this.novaCategoria = '';
      this.loadCategorias();
    }
  }

  editCategoria(categoria: string): void {
    this.categoriaEditada = categoria;
    this.categoriaSendoEditada = categoria;
    this.isEditCategoriaModalOpen = true;
  }

  updateCategoria(): void {
    if (this.categoriaEditada.trim() && this.categoriaSendoEditada) {
      this.servicoStorage.updateCategoria(this.categoriaSendoEditada, this.categoriaEditada.trim());
      this.closeEditCategoriaModal();
      this.loadCategorias();
    }
  }

  deleteCategoria(categoria: string): void {
    this.servicoStorage.deleteCategoria(categoria);
    this.loadCategorias();
  }

  closeEditCategoriaModal(): void {
    this.isEditCategoriaModalOpen = false;
    this.categoriaEditada = '';
    this.categoriaSendoEditada = null;
  }
}
