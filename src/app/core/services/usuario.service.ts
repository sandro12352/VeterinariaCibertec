import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario, UsuariosResponse } from '../models/usuarios.response';
import { UsuarioRequest } from '../models/usuarioRequest';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly http = inject(HttpClient);


  obtenerUsuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>('/api/v1/usuarios');
  }

  crearUsuario({nombre,password,email,rolId,telefono}:UsuarioRequest):Observable<Usuario>{
    return this.http.post<Usuario>('/api/v1/usuarios',{
      nombre,password,email,rolId,telefono
    })
  }

  eliminarUsuario(usuario:Usuario){
    return this.http.delete(`api/v1/usuarios/${usuario.id}`);
  }

}
