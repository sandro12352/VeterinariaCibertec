import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistorialClinico } from '../models/models';

@Injectable({ providedIn: 'root' })
export class HistorialesService {
  private apiUrl = '/api/v1/historiales';

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<HistorialClinico[]> {
    return this.http.get<HistorialClinico[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<HistorialClinico> {
    return this.http.get<HistorialClinico>(`${this.apiUrl}/${id}`);
  }

  obtenerPorMascota(mascotaId: number): Observable<HistorialClinico> {
    return this.http.get<HistorialClinico>(`${this.apiUrl}/mascota/${mascotaId}`);
  }

  crear(historial: HistorialClinico): Observable<HistorialClinico> {
    return this.http.post<HistorialClinico>(this.apiUrl, historial);
  }

  actualizar(id: number, historial: HistorialClinico): Observable<HistorialClinico> {
    return this.http.put<HistorialClinico>(`${this.apiUrl}/${id}`, historial);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
