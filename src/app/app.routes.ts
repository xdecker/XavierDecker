import { Routes } from '@angular/router';
import { ProductListComponent } from './features/products/presentation/pages/product-list/product-list.component';
import { ProductFormComponent } from './features/products/presentation/pages/product-form/product-form.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    component: ProductListComponent,
  },
  {
    path:'products/create',
    component: ProductFormComponent,
  }
];
