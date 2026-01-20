import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ProductFormComponent } from './product-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../application/services/products.service';
import { PRODUCT_REPOSITORY } from '../../../domain/tokens/product-repository.token';
import { ToastService } from '../../../../../core/services/toast.service';
import { By } from '@angular/platform-browser';

describe('ProductFormComponent - real test', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let mockProductsService: any;
  let mockToast: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockProductsService = {
      executeGetProduct: jasmine.createSpy('executeGetProduct').and.returnValue(
        Promise.resolve({
          id: 'P001',
          name: 'Producto Test',
          description: 'Descripción de prueba',
          logo: 'logo.png',
          date_release: '2026-01-20',
          date_revision: '2027-01-20',
        })
      ),
      executeCreateProduct: jasmine
        .createSpy('executeCreateProduct')
        .and.returnValue(
          Promise.resolve({ message: 'Producto creado', data: {} })
        ),
      executeUpdateProduct: jasmine
        .createSpy('executeUpdateProduct')
        .and.returnValue(
          Promise.resolve({ message: 'Producto actualizado', data: {} })
        ),
      executeVerifyIdentifierProduct: jasmine
        .createSpy('executeVerifyIdentifierProduct')
        .and.returnValue(Promise.resolve(false)),
    };

    mockToast = {
      showError: jasmine.createSpy('showError'),
      showSuccess: jasmine.createSpy('showSuccess'),
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      imports: [ProductFormComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => null } } },
        },
        { provide: PRODUCT_REPOSITORY, useValue: {} },
        { provide: ProductsService, useValue: mockProductsService },
        { provide: ToastService, useValue: mockToast },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create product on submit in creation mode', fakeAsync(async () => {
    //mockup
    component.form.setValue({
      id: 'P002',
      name: 'Test Product',
      description: 'Descripcion test',
      logo: 'logo.png',
      date_release: '2026-01-20',
      date_revision: '',
    });

    await component.onSubmit();
    tick();

    expect(
      mockProductsService.executeVerifyIdentifierProduct
    ).toHaveBeenCalledWith('P002');
    expect(mockProductsService.executeCreateProduct).toHaveBeenCalled();
    expect(mockToast.showSuccess).toHaveBeenCalledWith('Producto creado');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products']);
  }));

  it('should update product on submit in edit mode', fakeAsync(async () => {
    component.isEditMode = true;
    component.productId = 'P001';

    component.form.setValue({
      id: 'P001',
      name: 'Updated Product',
      description: 'Updated description',
      logo: 'logo.png',
      date_release: '2026-01-20',
      date_revision: '2027-01-20',
    });

    await component.onSubmit();
    tick();

    expect(mockProductsService.executeUpdateProduct).toHaveBeenCalled();
    expect(mockToast.showSuccess).toHaveBeenCalledWith('Producto actualizado');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products']);
  }));

  it('should show error if ID already exists', fakeAsync(async () => {
    mockProductsService.executeVerifyIdentifierProduct.and.returnValue(
      Promise.resolve(true)
    );

    component.form.setValue({
      id: 'P001',
      name: 'Test Product',
      description: 'Descripcion test',
      logo: 'logo.png',
      date_release: '2026-01-20',
      date_revision: '',
    });

    await component.onSubmit();
    tick();

    expect(component.idExistsError).toBeTrue();
    expect(mockToast.showError).toHaveBeenCalledWith('ID already exists');
    expect(mockProductsService.executeCreateProduct).not.toHaveBeenCalled();
  }));

  it('should show validation errors when form is invalid', () => {
    component.form.reset();

    component.form.markAllAsTouched();
    fixture.detectChanges();

    // mensajes de validacion por cada campo
    const idError = fixture.debugElement.query(
      By.css('input[formControlName="id"] + small.error')
    )?.nativeElement.textContent;
    expect(idError).toContain('Este campo es requerido');

    const nameError = fixture.debugElement.query(
      By.css('input[formControlName="name"] + small.error')
    )?.nativeElement.textContent;
    expect(nameError).toContain('Este campo es requerido');

    const descriptionError = fixture.debugElement.query(
      By.css('input[formControlName="description"] + small.error')
    )?.nativeElement.textContent;
    expect(descriptionError).toContain('Este campo es requerido');

    const logoError = fixture.debugElement.query(
      By.css('input[formControlName="logo"] + small.error')
    )?.nativeElement.textContent;
    expect(logoError).toContain('Este campo es requerido');

    const dateReleaseError = fixture.debugElement.query(
      By.css('input[formControlName="date_release"] + small.error')
    )?.nativeElement.textContent;
    expect(dateReleaseError).toContain('Este campo es requerido');

    // el botón de submit debe estar deshabilitado
    const submitButton = fixture.debugElement.query(
      By.css('button[type="submit"]')
    ).nativeElement;
    expect(submitButton.disabled).toBeTrue();
  });

  it('should show invalidReleaseDate error if date_release is in the past', () => {
    // ponemos una fecha pasada
    const pastDate = '2020-01-01';
    component.form.controls['date_release'].setValue(pastDate);
    component.form.controls['date_release'].markAsTouched();
    fixture.detectChanges();

    const dateReleaseError = fixture.debugElement.query(
      By.css('input[formControlName="date_release"] + small.error')
    )?.nativeElement.textContent;

    expect(dateReleaseError).toContain('La fecha debe ser hoy o mayor');
  });
});
