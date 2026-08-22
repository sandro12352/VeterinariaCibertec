import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  collapsed = signal(false);

  cerrarSession(){
    this.authService.removerTokem();
    this.router.navigate(['/auth/login'])
  }

  toggleSidebar(): void {
    this.collapsed.update(value => !value);
  }
}
