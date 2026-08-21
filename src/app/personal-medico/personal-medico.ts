import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PersonalMedico } from '../core/models';
import { PersonalMedicoService } from '../core/personal-medico.service';

@Component({
  selector: 'app-personal-medico',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './personal-medico.html',
  styleUrl: './personal-medico.css',
})
export class PersonalMedicoo implements OnInit {

  readonly medicos = signal<PersonalMedico[]>([]);
  readonly mensaje = signal('');
  readonly esError = signal(false);

  medico: PersonalMedico = this.nuevoMedico();

  private readonly personalMedicoService = inject(PersonalMedicoService);

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.personalMedicoService.listarMedicos().subscribe({
      next: response => this.medicos.set(response),
      error: error => {
        this.esError.set(true);
        this.mensaje.set(error.error?.message ?? 'No se pudieron obtener los médicos');
      }
    });
  }

  guardar(): void {
    this.mensaje.set('');

    const operacion = this.medico.usuarioId
      ? this.personalMedicoService.actualizarMedico(this.medico.usuarioId, this.medico)
      : this.personalMedicoService.registrarMedico(this.medico);

    operacion.subscribe({
      next: () => {
        this.esError.set(false);
        this.mensaje.set(this.medico.usuarioId
          ? 'Médico actualizado correctamente'
          : 'Médico registrado correctamente');
        this.cancelar();
        this.listar();
      },
      error: error => {
        this.esError.set(true);
        this.mensaje.set(error.error?.message ?? 'No se pudo guardar el médico');
      }
    });
  }

  editar(medico: PersonalMedico): void {
    this.medico = { ...medico };
    this.mensaje.set('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  eliminar(medico: PersonalMedico): void {
    if (!medico.usuarioId || !confirm(`¿Deseas eliminar al médico ${medico.personaNombre}?`)) {
      return;
    }

    this.personalMedicoService.eliminarMedico(medico.usuarioId).subscribe({
      next: () => {
        this.esError.set(false);
        this.mensaje.set('Médico eliminado correctamente');
        this.listar();
      },
      error: error => {
        this.esError.set(true);
        this.mensaje.set(error.error?.message ?? 'No se pudo eliminar el médico');
      }
    });
  }

  cancelar(): void {
    this.medico = this.nuevoMedico();
  }

  private nuevoMedico(): PersonalMedico {
    return {
      usuarioId: 0,
      numeroColegiatura: '',
      especialidad: '',
      rolNombre: '',
      personaNombre: ''
    };
  }
}
