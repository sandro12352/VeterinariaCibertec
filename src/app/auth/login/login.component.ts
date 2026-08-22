import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly AuthService = inject(AuthService);
  protected readonly router = inject(Router);

  usuario = '';
  password = '';
  messageError = signal('');

  rememberMe = false;
  showPassword = false;
  loading = signal(false);

  login(): void {

    if (!this.usuario || !this.password) {
      return;
    }

    this.loading.set(true) ;


    this.AuthService.login(this.usuario,this.password).subscribe({
      next:(res)=>{
        this.loading.set(false);
        this.router.navigate(['/dashboard']);
      },
      error:(error)=>{
        this.messageError.set(error.error.message);
        this.loading.set(false);
      }
    })


  }
}
