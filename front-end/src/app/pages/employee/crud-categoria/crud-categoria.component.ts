import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
export class CrudCategoriaComponent implements OnInit, AfterViewChecked {
  @ViewChild('categoriaInput') categoriaInput!: ElementRef;
  @ViewChild('editCategoryInput') editCategoryInput!: ElementRef;

  constructor(private servicoStorage: ServicoStorageService) {}

  ngOnInit(): void {
    this.loadCategorias();
  }

  ngAfterViewChecked(): void {
    if (this.isEditCategoriaModalOpen && this.editCategoryInput) {
      this.editCategoryInput.nativeElement.focus();
    }
  }

  // Categorias
  categorias: string[] = [];
  categoriaEditada: string = '';
  categoriaSendoEditada: string | null = null;
  isEditCategoriaModalOpen: boolean = false;
  isDeleteCategoriaModalOpen: boolean = false;
  categoriaParaExcluir: string | null = null;

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

  openDeleteModal(categoria: string): void {
    this.categoriaParaExcluir = categoria;
    this.isDeleteCategoriaModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteCategoriaModalOpen = false;
    this.categoriaParaExcluir = null;
  }

  confirmDeleteCategoria(): void {
    if (this.categoriaParaExcluir) {
      this.servicoStorage.deleteCategoria(this.categoriaParaExcluir);
      this.loadCategorias();
      this.closeDeleteModal();
    }
  }

  openEditModal(categoria: string): void {
    this.categoriaEditada = categoria;
    this.isEditCategoriaModalOpen = true;

    setTimeout(() => {
      this.editCategoryInput.nativeElement.focus();
    });
  }

  closeEditModal(): void {
    this.isEditCategoriaModalOpen = false;
    this.categoriaEditada = '';
  }

  saveCategoriaEditada(): void {
    if (this.categoriaEditada.trim()) {
      const index = this.categorias.indexOf(this.categoriaSendoEditada!);
      if (index !== -1) {
        this.categorias[index] = this.categoriaEditada.trim();
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
