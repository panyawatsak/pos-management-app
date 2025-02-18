import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule], // Add HttpClientModule here
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  productForm: FormGroup;
  editingProduct: any = null;
  apiUrl = 'http://localhost:5000/api/products';
  categoryApiUrl = 'http://localhost:5000/api/categories';
  showPopup: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.productForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      category_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchCategories();
  }

  fetchProducts() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      this.products = data;
    });
  }

  fetchCategories() {
    this.http.get<any[]>(this.categoryApiUrl).subscribe(data => {
      this.categories = data;
    });
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  }

  submitForm() {
    if (this.editingProduct) {
      this.http.put(`${this.apiUrl}/${this.editingProduct.id}`, this.productForm.value).subscribe(() => {
        alert('Product updated successfully!');
        this.fetchProducts();
        this.resetForm();
        this.showPopup = false;
      });
    } else {
      this.http.post(this.apiUrl, this.productForm.value).subscribe(() => {
        alert('Product added successfully!');
        this.fetchProducts();
        this.resetForm();
        this.showPopup = false;
      });
    }
  }

  editProduct(product: any) {
    this.editingProduct = product;
    this.productForm.patchValue(product);
    this.showPopup = true;
  }

  deleteProduct(id: string) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        alert('Product deleted successfully!');
        this.fetchProducts(); // Refresh the product list
      },
      error: (err) => {
        console.error('Error deleting product:', err);
        if (err.status === 400) {
          alert('Cannot delete category with associated products.');
        } else {
          alert('Failed to delete product.');
        }
      }
    });
  }  

  resetForm() {
    this.productForm.reset();
    this.editingProduct = null;
  }

  closePopup() {
    this.showPopup = false;
    this.resetForm();
  }
}