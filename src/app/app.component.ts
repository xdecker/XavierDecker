import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './core/components/toast/toast.component';
import { ToastService } from './core/services/toast.service';
import { HeaderPageComponent } from "./shared/components/header-page/header-page.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent, HeaderPageComponent],
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
