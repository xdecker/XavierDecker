import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { ToastService, ToastMessage } from '../../services/toast.service';

describe('ToastComponent - full coverage', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let toastService: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastComponent],
      providers: [ToastService],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    toastService = TestBed.inject(ToastService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add message when toastService emits', fakeAsync(() => {
    const msg: ToastMessage = { type: 'success', message: 'Mensaje test' };
    toastService.showSuccess(msg.message);

    tick();
    expect(component.messages.length).toBe(1);
    expect(component.messages[0]).toEqual(msg);
  }));

  it('should remove message after timeout', fakeAsync(() => {
    const msg: ToastMessage = { type: 'error', message: 'Error test' };
    toastService.showError(msg.message);

    tick();
    expect(component.messages.length).toBe(1);

    tick(4000);
    expect(component.messages.length).toBe(0);
  }));

  it('remove() should remove specific message', () => {
    const msg1: ToastMessage = { type: 'success', message: '1' };
    const msg2: ToastMessage = { type: 'error', message: '2' };
    component.messages = [msg1, msg2];

    component.remove(msg1);
    expect(component.messages).toEqual([msg2]);
  });
});
