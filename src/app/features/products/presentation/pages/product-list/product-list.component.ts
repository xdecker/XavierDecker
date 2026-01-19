import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../domain/models/product.model';
import { ToastService } from '../../../../../core/services/toast.service';
import { ConfirmDialogComponent } from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../../application/services/products.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ConfirmDialogComponent, RouterLink],

  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  dropdownOpen: string | null = null;
  page = 1;
  limit = 5;
  total = 0;
  search = '';

  loading = false;
  showConfirm = false;
  selectedProduct?: Product;

  constructor(
    private toast: ToastService,
    private service: ProductsService
  ) {}

  ngOnInit() {
    console.log('vista cargada');
    this.loadProducts();
  }

  async loadProducts() {
    this.loading = true;
    //await new Promise(resolve => setTimeout(resolve, 3000)); // to see loader
    this.service
      .executeGetProducts()
      .then((res) => {
        this.products = res.data;
        this.page = 1;
        this.filteredProducts = [...res.data];
        this.total = res.data.length;
        this.applyFilters();
      })
      .catch((err) => {
        this.toast.showError(err.message ?? 'Error al cargar productos');
      })
      .finally(() => {
        this.loading = false;
      });
  }

  applyFilters() {
    let filtered = [...this.products];

    if (this.search.trim()) {
      const term = this.search.toLowerCase();

      filtered = filtered.filter((p) =>
        Object.values(p).join(' ').toLowerCase().includes(term)
      );
    }

    this.total = filtered.length;

    const start = (this.page - 1) * this.limit;
    const end = start + this.limit;

    this.filteredProducts = filtered.slice(start, end);
  }

  onSearch(value: string) {
    this.search = value;
    this.page = 1;
    this.applyFilters();
  }

  onPageChange(page: number) {
    this.page = page;
    this.applyFilters();
  }

  onLimitChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.limit = Number(select.value);
    this.page = 1;
    this.applyFilters();
  }

  confirmDelete(product: Product) {
    this.selectedProduct = product;
    this.showConfirm = true;
  }

  deleteConfirmed() {
    if (!this.selectedProduct) return;

    this.service.executeDeleteProducts(this.selectedProduct.id)
      .then((res) => {
        this.toast.showSuccess(res.message);
        this.loadProducts();
      })
      .catch((err) => {
        this.toast.showError(err.message ?? 'No se pudo eliminar el producto');
      })
      .finally(() => {
        this.showConfirm = false;
      });
  }

  toggleDropdown(productId: string) {
    if (this.dropdownOpen === productId) {
      this.dropdownOpen = null;
    } else {
      this.dropdownOpen = productId;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.dropdownOpen = null;
    }
  }

  editProduct(product: Product) {
    this.toast.showSuccess(`Editar producto: ${product.name}`);
    this.dropdownOpen = null;
  }
}
