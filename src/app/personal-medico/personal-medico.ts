import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PersonalMedico } from '../core/models/models';
import { PersonalMedicoService } from '../core/services/personal-medico.service';

@Component({
  selector: 'app-personal-medico',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './personal-medico.html',
  styleUrl: './personal-medico.css',
})
export class PersonalMedicoo {

  // readonly medicos = signal<PersonalMedico[]>([]);
  // readonly mensaje = signal('');
  // readonly esError = signal(false);

  // medico: PersonalMedico = this.nuevoMedico();

  // private readonly personalMedicoService = inject(PersonalMedicoService);

  // mensaje(): string { return this.mensajeTexto; }
  // esError(): boolean { return this.error; }

  // cargarPersonal(): void {
  //   this.personalMedicoService.obtenerTodos().subscribe({
  //     next: data => this.personalLista = data,
  //     error: () => { this.error = true; this.mensajeTexto = 'Error al cargar personal médico'; }
  //   });
  // }

  // guardar(): void {
  //   if (this.personal.id) {
  //     this.personalMedicoService.actualizar(this.personal.id, this.personal).subscribe({
  //       next: () => { this.mensajeTexto = 'Personal médico actualizado'; this.error = false; this.cargarPersonal(); this.cancelar(); },
  //       error: () => { this.error = true; this.mensajeTexto = 'Error al actualizar personal médico'; }
  //     });
  //   } else {
  //     this.personalMedicoService.crear(this.personal).subscribe({
  //       next: () => { this.mensajeTexto = 'Personal médico registrado'; this.error = false; this.cargarPersonal(); this.cancelar(); },
  //       error: () => { this.error = true; this.mensajeTexto = 'Error al registrar personal médico'; }
  //     });
  //   }
  // }

  // editar(item: PersonalMedico): void { this.personal = { ...item }; }

  // eliminar(item: PersonalMedico): void {
  //   if (item.id) {
  //     this.personalMedicoService.eliminar(item.id).subscribe({
  //       next: () => { this.mensajeTexto = 'Personal médico eliminado'; this.error = false; this.cargarPersonal(); },
  //       error: () => { this.error = true; this.mensajeTexto = 'Error al eliminar personal médico'; }
  //     });
  //   }
  // }

  // cancelar(): void {
  //   this.personal = {
  //     id: undefined,
  //     usuarioId: 0,
  //     usuarioNombre: '',
  //     email: '',
  //     especialidad: '',
  //     numColegiatura: '',
  //     estadoRegistro: true
  //   };
  // }

  // personalMedicos(): PersonalMedico[] { return this.personalLista; }
}
