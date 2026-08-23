import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-topbar',
  imports: [TitleCasePipe],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent {
  private readonly authService = inject(AuthService);

  obtenerNombre() {
    return sessionStorage.getItem('authUsername')
  }

  obtenerRol(): string {
    const rawRoles = sessionStorage.getItem('authRoles');
    if (!rawRoles) return '';

    try {
      const roles: string[] = JSON.parse(rawRoles);
      if (roles.includes('ROLE_ADMIN')) {
        return 'Administrador';
      }
       if (roles.includes('ROLE_VETERINARIO')) {
        return 'Veterinario';
      }
    } catch (e) {
      return '';
    }

    return '';
  }

}
