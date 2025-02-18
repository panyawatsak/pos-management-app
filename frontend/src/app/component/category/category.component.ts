import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule], // Add HttpClientModule here
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: any[] = [];
  categoryForm: FormGroup;
  editingCategory: any = null;
  apiUrl = 'http://localhost:5000/api/categories';
  showPopup: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      this.categories = data;
    });
  }

  submitForm() {
    if (this.editingCategory) {
      this.http.put(`${this.apiUrl}/${this.editingCategory.id}`, this.categoryForm.value).subscribe(() => {
        this.fetchCategories();
        this.resetForm();
        this.showPopup = false;
      });
    } else {
      this.http.post(this.apiUrl, this.categoryForm.value).subscribe(() => {
        this.fetchCategories();
        this.resetForm();
        this.showPopup = false;
      });
    }
  }

  editCategory(category: any) {
    this.editingCategory = category;
    this.categoryForm.patchValue(category);
    this.showPopup = true;
  }

  deleteCategory(id: string) {
    if (confirm('Are you sure you want to delete this category and all associated products?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe({
        next: () => {
          alert('Category and associated products deleted successfully!');
          this.fetchCategories();
        },
        error: (err) => {
          console.error('Error deleting category:', err);
          alert('Failed to delete category.');
        }
      });
    }
  }  

  resetForm() {
    this.categoryForm.reset();
    this.editingCategory = null;
  }

  closePopup() {
    this.showPopup = false;
    this.resetForm();
  }
}