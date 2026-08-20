import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';

  rememberMe = false;
  showPassword = false;
  loading = false;

  login(): void {

    if (!this.email || !this.password) {
      return;
    }

    this.loading = true;

    // Aquí irá tu AuthService
    console.log({
      email: this.email,
      password: this.password,
      rememberMe: this.rememberMe
    });

    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }
}
