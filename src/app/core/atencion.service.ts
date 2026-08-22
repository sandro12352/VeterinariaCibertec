import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Atencion } from './models';

@Injectable({ providedIn: 'root' })
export class AtencionesService {
  private apiUrl = '/api/v1/atenciones';

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<Atencion[]> {
    return this.http.get<Atencion[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<Atencion> {
    return this.http.get<Atencion>(`${this.apiUrl}/${id}`);
  }

  listarPorHistorial(historialId: number): Observable<Atencion[]> {
    return this.http.get<Atencion[]>(`${this.apiUrl}/historial/${historialId}`);
  }

  listarPorPersonalMedico(personalMedicoId: number): Observable<Atencion[]> {
    return this.http.get<Atencion[]>(`${this.apiUrl}/personal-medico/${personalMedicoId}`);
  }

  listarPorEstado(estado: string): Observable<Atencion[]> {
    return this.http.get<Atencion[]>(`${this.apiUrl}/estado/${estado}`);
  }

  listarEntreFechas(fechaInicio: string, fechaFin: string): Observable<Atencion[]> {
    return this.http.get<Atencion[]>(`${this.apiUrl}/fechas?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
  }

  consultar(params: any): Observable<Atencion[]> {
    return this.http.get<Atencion[]>(`${this.apiUrl}/consulta`, { params });
  }

  crear(atencion: Atencion): Observable<Atencion> {
    return this.http.post<Atencion>(this.apiUrl, atencion);
  }

  actualizar(id: number, atencion: Atencion): Observable<Atencion> {
    return this.http.put<Atencion>(`${this.apiUrl}/${id}`, atencion);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
