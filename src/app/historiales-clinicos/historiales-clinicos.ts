import { HistorialesService } from '../core/historiales-clinicos.service';
import { HistorialClinico } from '../core/models';

export class Historiales {
  historialesLista: HistorialClinico[] = [];
  historial: HistorialClinico = {
    id: undefined,
    mascotaId: 0,
    mascotaNombre: '',
    clienteNombre: '',
    observaciones: '',
    fechaApertura: '',
    estadoRegistro: true
  };
  mensajeTexto: string = '';
  error: boolean = false;

  constructor(private historialesService: HistorialesService) {
    this.cargarHistoriales();
  }

  mensaje(): string { return this.mensajeTexto; }
  esError(): boolean { return this.error; }

  cargarHistoriales(): void {
    this.historialesService.obtenerTodos().subscribe({
      next: data => this.historialesLista = data,
      error: () => { this.error = true; this.mensajeTexto = 'Error al cargar historiales clínicos'; }
    });
  }

  guardar(): void {
    if (this.historial.id) {
      this.historialesService.actualizar(this.historial.id, this.historial).subscribe({
        next: () => { this.mensajeTexto = 'Historial actualizado'; this.error = false; this.cargarHistoriales(); this.cancelar(); },
        error: () => { this.error = true; this.mensajeTexto = 'Error al actualizar historial'; }
      });
    } else {
      this.historialesService.crear(this.historial).subscribe({
        next: () => { this.mensajeTexto = 'Historial registrado'; this.error = false; this.cargarHistoriales(); this.cancelar(); },
        error: () => { this.error = true; this.mensajeTexto = 'Error al registrar historial'; }
      });
    }
  }

  editar(item: HistorialClinico): void { this.historial = { ...item }; }

  eliminar(item: HistorialClinico): void {
    if (item.id) {
      this.historialesService.eliminar(item.id).subscribe({
        next: () => { this.mensajeTexto = 'Historial eliminado'; this.error = false; this.cargarHistoriales(); },
        error: () => { this.error = true; this.mensajeTexto = 'Error al eliminar historial'; }
      });
    }
  }

  cancelar(): void {
    this.historial = {
      id: undefined,
      mascotaId: 0,
      mascotaNombre: '',
      clienteNombre: '',
      observaciones: '',
      fechaApertura: '',
      estadoRegistro: true
    };
  }

  historiales(): HistorialClinico[] { return this.historialesLista; }
}
