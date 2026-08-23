import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: '',
    loadComponent: () => import('./layout/main-layout/main-layout.component').then((m) => m.MainLayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard').then((m) => m.Dashboard)
      },
      {
        path: 'usuarios',
        loadComponent: () => import('./usuarios/usuarios').then((m) => m.Usuarios),
      },
      {
        path: 'atenciones',
        loadComponent: () => import('./atencion/atencion.component').then((m) => m.AtencionComponent),
      },
      {
        path: 'personal-medico',
        loadComponent: () => import('./personal-medico/personal-medico').then((m) => m.PersonalMedicoo),
      },
      {
        path: 'mascotas',
        loadComponent: () => import('./mascotas/mascotas.component').then((m) => m.MascotasComponent),
      },
      {
        path: 'mascotas/animales', // Mismo nivel dentro de main-layout
        loadComponent: () => import('./animales/animales.component').then((m) => m.AnimalesComponent),
      }

    ]
  },

  {
    path: '**',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  }
];
