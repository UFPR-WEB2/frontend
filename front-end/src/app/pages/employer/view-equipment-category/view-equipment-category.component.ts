import { Component } from '@angular/core';
<<<<<<< HEAD

@Component({
  selector: 'app-view-equipment-category',
  standalone: true,
  imports: [],
  templateUrl: './view-equipment-category.component.html',
  styleUrl: './view-equipment-category.component.css'
})
export class ViewEquipmentCategoryComponent {

=======
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-equipment-category',
  templateUrl: './view-equipment-category.component.html',
  styleUrls: ['./view-equipment-category.component.css']
})
export class ViewEquipmentCategoryComponent  {
  categories = ['Notebook', 'Impressora', 'Desktop', 'Microfone'];
  newCategory = '';
  currentCategory = '';
  isModalOpen = false;
  currentEditIndex: number | null = null;

  addCategory() {
    if (this.newCategory.trim()) {
      this.categories.push(this.newCategory);
      this.newCategory = '';
    }
  }

  editCategory(index: number) {
    this.currentEditIndex = index;
    this.currentCategory = this.categories[index];
    this.isModalOpen = true;
  }

  saveEdit() {
    if (this.currentEditIndex !== null && this.currentCategory.trim()) {
      this.categories[this.currentEditIndex] = this.currentCategory;
      this.closeModal();
    }
  }

  deleteCategory(index: number) {
    this.categories.splice(index, 1);
  }

  closeModal() {
    this.isModalOpen = false;
  }

  goBack() {
    window.history.back();
  }
>>>>>>> 1a255b3fd2cf62e17e0fe69f116c8cb39ef28f1e
}
