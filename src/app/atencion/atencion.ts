import { AtencionesService } from '../core/atencion.service';
import { Atencion } from '../core/models';

export class Atenciones {
  atencionesLista: Atencion[] = [];
  atencion: Atencion = {
    id: undefined,
    servicioId: 0,
    servicioNombre: '',
    personalMedicoId: 0,
    personalMedicoNombre: '',
    historialId: 0,
    mascotaId: 0,
    mascotaNombre: '',
    clienteNombre: '',
    motivo: '',
    diagnostico: '',
    estado: 'PENDIENTE',
    fechaAtencion: '',
    costoAtencion: 0,
    estadoRegistro: true
  };
  mensajeTexto: string = '';
  error: boolean = false;

  constructor(private atencionesService: AtencionesService) {
    this.cargarAtenciones();
  }

  mensaje(): string { return this.mensajeTexto; }
  esError(): boolean { return this.error; }

  cargarAtenciones(): void {
    this.atencionesService.obtenerTodos().subscribe({
      next: data => this.atencionesLista = data,
      error: () => { this.error = true; this.mensajeTexto = 'Error al cargar atenciones'; }
    });
  }

  guardar(): void {
    if (this.atencion.id) {
      this.atencionesService.actualizar(this.atencion.id, this.atencion).subscribe({
        next: () => { this.mensajeTexto = 'Atención actualizada'; this.error = false; this.cargarAtenciones(); this.cancelar(); },
        error: () => { this.error = true; this.mensajeTexto = 'Error al actualizar atención'; }
      });
    } else {
      this.atencionesService.crear(this.atencion).subscribe({
        next: () => { this.mensajeTexto = 'Atención registrada'; this.error = false; this.cargarAtenciones(); this.cancelar(); },
        error: () => { this.error = true; this.mensajeTexto = 'Error al registrar atención'; }
      });
    }
  }

  editar(item: Atencion): void { this.atencion = { ...item }; }

  eliminar(item: Atencion): void {
    if (item.id) {
      this.atencionesService.eliminar(item.id).subscribe({
        next: () => { this.mensajeTexto = 'Atención eliminada'; this.error = false; this.cargarAtenciones(); },
        error: () => { this.error = true; this.mensajeTexto = 'Error al eliminar atención'; }
      });
    }
  }

  cancelar(): void {
    this.atencion = {
      id: undefined,
      servicioId: 0,
      servicioNombre: '',
      personalMedicoId: 0,
      personalMedicoNombre: '',
      historialId: 0,
      mascotaId: 0,
      mascotaNombre: '',
      clienteNombre: '',
      motivo: '',
      diagnostico: '',
      estado: 'PENDIENTE',
      fechaAtencion: '',
      costoAtencion: 0,
      estadoRegistro: true
    };
  }

  atenciones(): Atencion[] { return this.atencionesLista; }
}
