import { Component, OnInit } from '@angular/core';
import { ServicoStorageService } from '../../../services/servico-storage.service'; 

@Component({
  selector: 'app-crud-categoria',
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
    this.loadCategories(); 
  }

  loadCategories(): void {
    const servicos = this.servicoStorage.getServicos();
    this.categories = servicos.map(servico => servico.categoria); 
  }

  addCategory(): void {
    if (this.newCategory.trim()) {
      const novoServico = {
        id: new Date().getTime(),
        data: new Date().toLocaleString(), 
        descricaoEquipamento: 'Novo Equipamento', 
        descricaoErro: 'Descrição do erro', 
        status: 'ABERTA', 
        categoria: this.newCategory.trim(),
      };

      this.servicoStorage.addServico(novoServico); 
      this.newCategory = ''; 
      this.loadCategories(); 
    }
  }

  deleteCategory(category: string): void {
    const servicos = this.servicoStorage.getServicos();
    const servicoParaDeletar = servicos.find(servico => servico.categoria === category);
    
    if (servicoParaDeletar) {
      const servicosAtualizados = servicos.filter(servico => servico.categoria !== category);
      this.servicoStorage.saveServicos(servicosAtualizados);
      this.loadCategories(); 
    }
  }

  editCategory(category: string): void {
    this.editedCategory = category;
    this.categoryBeingEdited = category;
    this.isEditModalOpen = true;
  }

  updateCategory(): void {
    if (this.categoryBeingEdited && this.editedCategory.trim()) {
      const servicos = this.servicoStorage.getServicos();
      const servicoParaAtualizar = servicos.find(servico => servico.categoria === this.categoryBeingEdited);
      
      if (servicoParaAtualizar) {
        servicoParaAtualizar.categoria = this.editedCategory.trim(); 
        this.servicoStorage.updateServico(servicoParaAtualizar.id, servicoParaAtualizar); 
        this.closeEditModal(); 
        this.loadCategories(); 
      }
    }
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.editedCategory = '';
    this.categoryBeingEdited = null;
  }

}
