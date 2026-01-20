import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../../../core/services/toast.service';
import { Product } from '../../../domain/models/product.model';
import { formatForDateInput } from '../../../../../core/utils/dateformat';
import { LoadingComponent } from '../../../../../shared/components/loading/loading.component';
import { ProductsService } from '../../../application/services/products.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent],

  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;
  loading = false;
  isEditMode = false;
  productId: string | null = null;
  idExistsError = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService,
    private service: ProductsService
  ) {
    this.form = this.fb.group({
      id: [
        { value: '', disabled: false },
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      logo: ['', Validators.required],
      date_release: [
        '',
        [Validators.required, this.validateReleaseDate.bind(this)],
      ],
      date_revision: [{ value: '' }],
    });
  }

  async ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.productId;

    if (this.isEditMode && this.productId) {
      try {
        const res = await this.service.executeGetProduct(this.productId);
        if (res) {
          this.form.patchValue({
            ...res,
            date_release: formatForDateInput(res.date_release),
            date_revision: formatForDateInput(res.date_revision),
          });
          this.form.get('id')?.disable();
          this.form.markAllAsTouched();
        }
      } catch {
        this.toast.showError('Error cargando el producto');
      }
    }

    this.form.get('id')?.valueChanges.subscribe((value) => {
      this.idExistsError = false;
    });

    this.form.get('date_release')?.valueChanges.subscribe((value) => {
      this.updateRevisionDate(value);
    });
    this.form.get('date_revision')?.disable();
  }

  async onSubmit() {
    try {
      console.log('onsubmit');
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        this.toast.showError('Por favor, ingrese datos correctamente');
        return;
      }
      const productToSubmit = this.form.getRawValue() as Product;
      let response: { data: Product; message: string } | undefined;
      this.loading = true;
      //await new Promise(resolve => setTimeout(resolve, 3000)); // to see loader
      if (this.isEditMode) {
        response = await this.service.executeUpdateProduct(productToSubmit);
      } else {
        //verify id
        const exists = await this.service.executeVerifyIdentifierProduct(
          productToSubmit.id
        );
        if (exists) {
          this.idExistsError = true;
          this.toast.showError('ID already exists');
          return;
        }

        response = await this.service.executeCreateProduct(productToSubmit);
      }

      if (response) {
        this.toast.showSuccess(response.message);
        this.router.navigate(['/products']);
      }
    } catch (err: any) {
      this.toast.showError(err?.message ?? 'No se pudo procesar solicitud');
    } finally {
      this.loading = false;
    }
  }

  resetForm() {
    this.idExistsError = false;
    if (this.isEditMode) {
      const idValue = this.form.controls['id'].value;
      console.log(idValue);
      this.form.reset();
      this.form.controls['id'].setValue(idValue);
      this.form.controls['id'].disable();
    } else {
      this.form.reset();
    }
  }

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  validateReleaseDate(control: AbstractControl) {
    if (!control.value) return null;

    const today = new Date();
    const todayNum =
      today.getFullYear() * 10000 +
      (today.getMonth() + 1) * 100 +
      today.getDate();

    const [year, month, day] = control.value.split('-').map(Number);
    const inputNum = year * 10000 + month * 100 + day;

    return inputNum >= todayNum ? null : { invalidReleaseDate: true };
  }

  updateRevisionDate(releaseDateStr: string) {
    if (!releaseDateStr) {
      this.form.get('date_revision')?.setValue('');
      return;
    }

    const [year, month, day] = releaseDateStr.split('-').map(Number);
    const revisionYear = year + 1;

    const revisionDateStr = `${revisionYear}-${String(month).padStart(
      2,
      '0'
    )}-${String(day).padStart(2, '0')}`;
    this.form.get('date_revision')?.setValue(revisionDateStr);
  }

  get isFormValid() {
    return Object.values(this.form.controls)
      .filter((c) => !c.disabled)
      .every((c) => c.valid);
  }
}
