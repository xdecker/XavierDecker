import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { PRODUCT_REPOSITORY } from './features/products/domain/tokens/product-repository.token';
import { ProductRepositoryImpl } from './features/products/infrastructure/repositories/product.repository.impl';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductRepositoryImpl
    }
  ],
};
