import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../../material';
import { CrudCategoriaService, Categoria} from '../../../services/api/crud-categoria.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-crud-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ButtonComponent, HttpClientModule],
  templateUrl: './crud-categoria.component.html',
  styleUrls: ['./crud-categoria.component.css'],
})
export class CrudCategoriaComponent implements OnInit, AfterViewChecked {
  @ViewChild('categoriaInput') categoriaInput!: ElementRef;
  @ViewChild('editCategoryInput') editCategoryInput!: ElementRef;

  categorias: Categoria[] = [];
  categoriaEditada: Categoria = new Categoria(0, '');
  categoriaSendoEditada: Categoria | null = null;
  isEditCategoriaModalOpen = false;
  isDeleteCategoriaModalOpen = false;
  categoriaParaExcluir: Categoria | null = null;

  constructor(private crudService: CrudCategoriaService) {}

  ngOnInit(): void {
    this.loadCategorias();
  }

  ngAfterViewChecked(): void {
    if (this.isEditCategoriaModalOpen && this.editCategoryInput) {
      this.editCategoryInput.nativeElement.focus();
    }
  }

  loadCategorias(): void {
    this.crudService.getCategorias().subscribe(
      (data) => {
        this.categorias = data;
      },
      (error) => {
        console.error('Erro ao carregar categorias', error);
      }
    );
  }

  addCategoria(): void {
    const nomeCategoria = this.categoriaInput.nativeElement.value.trim();
    if (nomeCategoria) {
      const novaCategoria = new Categoria(0, nomeCategoria);
      this.crudService.createCategoria(novaCategoria).subscribe(
        () => {
          this.categoriaInput.nativeElement.value = '';
          this.loadCategorias();
        },
        (error) => {
          console.error('Erro ao adicionar categoria', error);
        }
      );
    }
  }

  editCategoria(categoria: Categoria): void {
    this.categoriaEditada = { ...categoria };
    this.categoriaSendoEditada = categoria;
    this.isEditCategoriaModalOpen = true;
  }

  updateCategoria(): void {
    if (this.categoriaEditada.nomeCategoria.trim() && this.categoriaSendoEditada) {
      this.crudService
        .updateCategoria(this.categoriaSendoEditada.id, this.categoriaEditada)
        .subscribe(
          () => {
            this.closeEditModal();
            this.loadCategorias();
          },
          (error) => {
            console.error('Erro ao atualizar categoria', error);
          }
        );
    }
  }

  openDeleteModal(categoria: Categoria): void {
    this.categoriaParaExcluir = categoria;
    this.isDeleteCategoriaModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteCategoriaModalOpen = false;
    this.categoriaParaExcluir = null;
  }

  confirmDeleteCategoria(): void {
    if (this.categoriaParaExcluir) {
      this.crudService.deleteCategoria(this.categoriaParaExcluir.id).subscribe(
        () => {
          this.loadCategorias();
          this.closeDeleteModal();
        },
        (error) => {
          console.error('Erro ao excluir categoria', error);
        }
      );
    }
  }

  closeEditModal(): void {
    this.isEditCategoriaModalOpen = false;
    this.categoriaEditada = new Categoria(0, '');
  }

  goBack(): void {
    window.history.back();
  }
}
