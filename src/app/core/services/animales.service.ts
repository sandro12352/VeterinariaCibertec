import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal } from '../models/models';

@Injectable({ providedIn: 'root' })
export class AnimalesService {
  private apiUrl = '/api/v1/animales';

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.apiUrl);
  }

  buscarPorNombre(nombre: string): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.apiUrl}/buscar?nombre=${nombre}`);
  }

  obtenerPorId(id: number): Observable<Animal> {
    return this.http.get<Animal>(`${this.apiUrl}/${id}`);
  }

  crear(animal: Animal): Observable<Animal> {
    return this.http.post<Animal>(this.apiUrl, animal);
  }

  actualizar(id: number, animal: Animal): Observable<Animal> {
    return this.http.put<Animal>(`${this.apiUrl}/${id}`, animal);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
