import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicoStorageService } from '../../../services/servico-storage.service';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../../material';

@Component({
  selector: 'app-crud-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ButtonComponent],
  templateUrl: './crud-categoria.component.html',
  styleUrls: ['./crud-categoria.component.css'],
})
export class CrudCategoriaComponent implements OnInit {
  @ViewChild('categoriaInput') categoriaInput!: ElementRef;
  @ViewChild('editCategoryInput') editCategoryInput!: ElementRef;

  categories: string[] = [];
  newCategory: string = '';
  editedCategory: string = '';
  categoryBeingEdited: string | null = null;
  isEditModalOpen: boolean = false;

  constructor(private servicoStorage: ServicoStorageService) {}

  ngOnInit(): void {
    this.loadCategorias();
  }

  // Categorias
  categorias: string[] = [];
  categoriaEditada: string = '';
  categoriaSendoEditada: string | null = null;
  isEditCategoriaModalOpen: boolean = false;

  loadCategorias(): void {
    this.categorias = this.servicoStorage.getCategorias();
  }

  addCategoria(): void {
    let novaCategoria = this.categoriaInput.nativeElement.value;
    console.log(novaCategoria);
    if (novaCategoria.trim()) {
      this.servicoStorage.addCategoria(novaCategoria.trim());
      this.categoriaInput.nativeElement.value = '';
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
      this.servicoStorage.updateCategoria(
        this.categoriaSendoEditada,
        this.categoriaEditada.trim()
      );
      this.closeEditModal();
      this.loadCategorias();
    }
  }

  deleteCategoria(categoria: string): void {
    this.servicoStorage.deleteCategoria(categoria);
    this.loadCategorias();
  }

  openEditModal(categoria: string): void {
    this.categoriaEditada = categoria;
    this.isEditCategoriaModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditCategoriaModalOpen = false;
  }

  saveCategoriaEditada(): void {
    const novoValor = this.editCategoryInput.nativeElement.value.trim();
    if (novoValor) {
      const index = this.categorias.indexOf(this.categoriaEditada);
      if (index !== -1) {
        this.categorias[index] = novoValor;
        this.servicoStorage.saveCategorias(this.categorias);
        this.closeEditModal();
      }
    } else {
      alert('O valor da categoria não pode ser vazio.');
    }
  }

  goBack(): void {
    window.history.back();
  }
}
