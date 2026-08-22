import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonalMedico } from './models';

@Injectable({ providedIn: 'root' })
export class PersonalMedicoService {
  private apiUrl = '/api/v1/personal-medico';

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<PersonalMedico[]> {
    return this.http.get<PersonalMedico[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<PersonalMedico> {
    return this.http.get<PersonalMedico>(`${this.apiUrl}/${id}`);
  }

  obtenerPorUsuario(usuarioId: number): Observable<PersonalMedico> {
    return this.http.get<PersonalMedico>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  crear(personal: PersonalMedico): Observable<PersonalMedico> {
    return this.http.post<PersonalMedico>(this.apiUrl, personal);
  }

  actualizar(id: number, personal: PersonalMedico): Observable<PersonalMedico> {
    return this.http.put<PersonalMedico>(`${this.apiUrl}/${id}`, personal);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
