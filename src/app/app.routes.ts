import { Routes } from '@angular/router';
import { ProductListComponent } from './features/products/presentation/pages/product-list/product-list.component';
import { ProductFormComponent } from './features/products/presentation/pages/product-form/product-form.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

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
    path: 'products/create',
    component: ProductFormComponent,
  },
  {
    path: 'products/edit/:id',
    component: ProductFormComponent,
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];
