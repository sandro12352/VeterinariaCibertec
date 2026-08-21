import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Atencion } from '../core/models';
import { AtencionService } from '../core/atencion.service';

@Component({
  selector: 'app-atencion',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './atencion.html',
  styleUrl: './atencion.css',
})
export class Atenciones implements OnInit {

  readonly atenciones = signal<Atencion[]>([]);
  readonly mensaje = signal('');
  readonly esError = signal(false);

  atencion: Atencion = this.nuevaAtencion();

  private readonly atencionService = inject(AtencionService);

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.atencionService.listar().subscribe({
      next: response => this.atenciones.set(response),
      error: error => {
        this.esError.set(true);
        this.mensaje.set(error.error?.message ?? 'No se pudieron obtener las atenciones');
      }
    });
  }

  guardar(): void {
    this.mensaje.set('');

    const operacion = this.atencion.id
      ? this.atencionService.actualizar(this.atencion.id, this.atencion)
      : this.atencionService.crear(this.atencion);

    operacion.subscribe({
      next: () => {
        this.esError.set(false);
        this.mensaje.set(this.atencion.id
          ? 'Atención actualizada correctamente'
          : 'Atención registrada correctamente');
        this.cancelar();
        this.listar();
      },
      error: error => {
        this.esError.set(true);
        this.mensaje.set(error.error?.message ?? 'No se pudo guardar la atención');
      }
    });
  }

  editar(atencion: Atencion): void {
    this.atencion = { ...atencion };
    this.mensaje.set('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  eliminar(atencion: Atencion): void {
    if (!atencion.id || !confirm(`¿Deseas eliminar la atención con motivo ${atencion.motivo}?`)) {
      return;
    }

    this.atencionService.eliminar(atencion.id).subscribe({
      next: () => {
        this.esError.set(false);
        this.mensaje.set('Atención eliminada correctamente');
        this.listar();
      },
      error: error => {
        this.esError.set(true);
        this.mensaje.set(error.error?.message ?? 'No se pudo eliminar la atención');
      }
    });
  }

  cancelar(): void {
    this.atencion = this.nuevaAtencion();
  }

  private nuevaAtencion(): Atencion {
    return {
      motivo: '',
      estado: '',
      fecha: '',
      mascotaId: 0,
      personalMedicoId: 0
    };
  }
}
