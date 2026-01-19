import { InjectionToken } from '@angular/core';
import { ProductRepository } from '../repositories/product.repository';

export const PRODUCT_REPOSITORY = new InjectionToken<ProductRepository>(
  'PRODUCT_REPOSITORY'
);

