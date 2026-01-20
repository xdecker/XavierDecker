import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';

describe('ToastService - coverage full', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit success message', (done) => {
    const msg = 'Éxito';

    service.toast$.subscribe((toast) => {
      expect(toast.type).toBe('success');
      expect(toast.message).toBe(msg);
      done();
    });
    service.showSuccess(msg);
  });

  it('should emit error message', (done) => {
    const msg = 'Error';
    service.toast$.subscribe((toast) => {
      expect(toast.type).toBe('error');
      expect(toast.message).toBe(msg);
      done();
    });
    service.showError(msg);
  });
});
