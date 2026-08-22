import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import path from 'path';

export const routes: Routes = [
    {
        path:'auth/login',
        component:LoginComponent,
    },
    {
      path:'dashboard',
      loadComponent:()=> import('./layout/main-layout/main-layout.component').then((m)=>m.MainLayoutComponent),
      children:[
        {
          path:'',
          loadComponent:()=>import('./dashboard/dashboard').then((m)=>m.Dashboard)
        },
        {
          path:'atenciones',
          loadComponent:()=>import('./atencion/atencion').then((m)=>m.Atenciones),
        }
      ] 
    },
    {
      path:'',
      redirectTo:'auth/login',
      pathMatch:'full'
    },
    {
        path:'**',
        redirectTo:'auth/login',
        pathMatch:'full',
    }
];
