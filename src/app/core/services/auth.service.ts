import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../models/login.response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  login(nombre: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/v1/auth/login', { nombre, password }).pipe(
      tap(Response => {
        sessionStorage.setItem(
          'authToken',
          Response.token
        );
        sessionStorage.setItem(
          'authUsername',
          Response.nombre
        );
        sessionStorage.setItem(
          'authRoles',
          JSON.stringify(Response.roles)
        );
      })
    );
  }


  obtenerToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  removerTokem(){
    return sessionStorage.removeItem('authToken');
  }

}
