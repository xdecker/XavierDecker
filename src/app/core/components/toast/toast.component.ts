import { Component, OnInit } from '@angular/core';
import { ToastMessage, ToastService } from '../../services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent implements OnInit {
  messages: ToastMessage[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toast$.subscribe((msg) => {
      this.messages.push(msg);
      setTimeout(() => this.remove(msg), 4000);
    });
  }

  remove(msg: ToastMessage) {
    this.messages = this.messages.filter((m) => m !== msg);
  }
}
