import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductsService } from '../../../application/services/products.service';
import { ToastService } from '../../../../../core/services/toast.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  const productsMock = [
    {
      id: 'P001',
      name: 'Producto 1',
      description: 'Desc 1',
      logo: '',
      date_release: '',
      date_revision: '',
    },
    {
      id: 'P002',
      name: 'Producto 2',
      description: 'Desc 2',
      logo: '',
      date_release: '',
      date_revision: '',
    },
    {
      id: 'P003',
      name: 'Producto 3',
      description: 'Desc 3',
      logo: '',
      date_release: '',
      date_revision: '',
    },
    {
      id: 'P004',
      name: 'Producto 4',
      description: 'Desc 4',
      logo: '',
      date_release: '',
      date_revision: '',
    },
    {
      id: 'P005',
      name: 'Producto 5',
      description: 'Desc 5',
      logo: '',
      date_release: '',
      date_revision: '',
    },
    {
      id: 'P006',
      name: 'Producto 6',
      description: 'Desc 6',
      logo: '',
      date_release: '',
      date_revision: '',
    },
  ];

  const productsServiceMock = {
    executeGetProducts: jasmine
      .createSpy('executeGetProducts')
      .and.returnValue(Promise.resolve({ data: productsMock })),
    executeDeleteProducts: jasmine
      .createSpy('executeDeleteProducts')
      .and.returnValue(Promise.resolve({ message: 'Deleted' })),
  };

  const toastServiceMock = {
    showSuccess: jasmine.createSpy('showSuccess'),
    showError: jasmine.createSpy('showError'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [
        { provide: ProductsService, useValue: productsServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => null } },
            params: of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // ngOnInit se ejecuta aquí
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', async () => {
    await fixture.whenStable();
    expect(component.products.length).toBe(6);
    expect(component.filteredProducts.length).toBe(5);
    expect(component.total).toBe(6);
    expect(productsServiceMock.executeGetProducts).toHaveBeenCalled();
  });

  it('should filter products when searching', async () => {
    await fixture.whenStable();
    component.onSearch('Producto 1');
    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].name).toBe('Producto 1');
  });

  it('should delete a product', async () => {
    await fixture.whenStable();
    component.selectedProduct = productsMock[0];
    await component.deleteConfirmed();
    expect(productsServiceMock.executeDeleteProducts).toHaveBeenCalledWith(
      'P001'
    );
    expect(toastServiceMock.showSuccess).toHaveBeenCalledWith('Deleted');
  });

  it('should paginate correctly', async () => {
    await fixture.whenStable();
    component.page = 2;
    component.applyFilters();
    expect(component.filteredProducts.length).toBe(1); // 6 mockups - 5 de primera hoja = 1 en segunda hoja
    expect(component.filteredProducts[0].id).toBe('P006');
  });

  it('should close dropdown on document click outside', () => {
    component.dropdownOpen = 'P001';
    component.onDocumentClick({ target: document.createElement('div') } as any);
    expect(component.dropdownOpen).toBeNull();
  });
});
