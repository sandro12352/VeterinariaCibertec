import { Component, inject } from '@angular/core';
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

  rememberMe = false;
  showPassword = false;
  loading = false;

  login(): void {

    if (!this.usuario || !this.password) {
      return;
    }

    this.loading = true;


    this.AuthService.login(this.usuario,this.password).subscribe({
      next:(res)=>{
        this.loading = false;
        this.router.navigate(['/dashboard']);
      }
    })


  }
}
