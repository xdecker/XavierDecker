import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './core/components/toast/toast.component';
import { ToastService } from './core/services/toast.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'products';
  constructor(private toastService: ToastService) {}

  ngOnInit() {
    // setTimeout(() => {
    //   this.toastService.showError('testing');
    // }, 500);
  }
}
