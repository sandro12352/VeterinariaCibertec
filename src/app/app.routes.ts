import { Routes } from '@angular/router';
import { Animales } from './animales/animales';
import { Atenciones } from './atencion/atencion';
import { Clientes } from './clientes/clientes';
import { HistorialesClinicos } from './historiales-clinicos/historiales-clinicos';
import { Mascotas } from './mascotas/mascotas';
import { PersonalMedicoo } from './personal-medico/personal-medico';
import { Servicios } from './servicios/servicios';
import { Usuarios } from './usuarios/usuarios';


export const routes: Routes = [
   
    {
    path: 'animales',
    component: Animales
  },
  
    {
    path: 'atencion',
    component: Atenciones
  },

  {
    path: 'clientes',
    component: Clientes
  },
  {
    path: 'historiales-clinicos',
    component: HistorialesClinicos
  },
  {
    path: 'mascotas',
    component: Mascotas
  },
  {
    path: 'personal-medico',
    component: PersonalMedicoo
  },
  {
    path: 'servicios',
    component: Servicios
  },
  {
    path: 'usuarios',
    component: Usuarios
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }

];


