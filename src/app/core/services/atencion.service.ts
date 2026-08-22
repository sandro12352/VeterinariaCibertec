import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Atencion } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class AtencionService {
  private readonly http = inject(HttpClient);
  private readonly url = '/api/v1/atenciones'; // Ajusta según tu backend

  listar(): Observable<Atencion[]> {
    return this.http.get<Atencion[]>(this.url);
  }

  crear(atencion: Atencion): Observable<Atencion> {
    return this.http.post<Atencion>(this.url, atencion);
  }

  actualizar(id: number, atencion: Atencion): Observable<Atencion> {
    return this.http.put<Atencion>(`${this.url}/${id}`, atencion);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
