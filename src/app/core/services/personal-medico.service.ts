import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonalMedico } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class PersonalMedicoService {

  private apiUrl = 'http://localhost:8080/api/personal-medico'; // Ajusta la URL según tu backend

  constructor(private http: HttpClient) {}

  // Listar todos los médicos
  listarMedicos(): Observable<PersonalMedico[]> {
    return this.http.get<PersonalMedico[]>(this.apiUrl);
  }

  // Obtener médico por ID
  obtenerMedicoPorId(id: number): Observable<PersonalMedico> {
    return this.http.get<PersonalMedico>(`${this.apiUrl}/${id}`);
  }

  // Registrar médico
  registrarMedico(medico: PersonalMedico): Observable<PersonalMedico> {
    return this.http.post<PersonalMedico>(this.apiUrl, medico);
  }

  // Actualizar médico
  actualizarMedico(id: number, medico: PersonalMedico): Observable<PersonalMedico> {
    return this.http.put<PersonalMedico>(`${this.apiUrl}/${id}`, medico);
  }

  // Eliminar médico
  eliminarMedico(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
