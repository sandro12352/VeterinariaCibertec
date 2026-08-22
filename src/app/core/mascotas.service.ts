import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mascota } from './models';

@Injectable({ providedIn: 'root' })
export class MascotasService {
  private apiUrl = '/api/v1/mascotas';

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.apiUrl}/${id}`);
  }

  listarPorCliente(clienteId: number): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.apiUrl}/cliente/${clienteId}`);
  }

  listarPorAnimal(animalId: number): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.apiUrl}/animal/${animalId}`);
  }

  consultar(params: any): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.apiUrl}/consulta`, { params });
  }

  crear(mascota: Mascota): Observable<Mascota> {
    return this.http.post<Mascota>(this.apiUrl, mascota);
  }

  actualizar(id: number, mascota: Mascota): Observable<Mascota> {
    return this.http.put<Mascota>(`${this.apiUrl}/${id}`, mascota);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
