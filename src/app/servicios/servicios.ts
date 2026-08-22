import { Servicio } from "../core/models/models";
import { ServiciosService } from "../core/services/servicios.service";

export class Servicios {
  serviciosLista: Servicio[] = [];
  servicio: Servicio = {
    id: undefined,
    nomServicio: '',
    precio: 0,
    descripcion: '',
    estadoRegistro: true
  };
  mensajeTexto: string = '';
  error: boolean = false;

  constructor(private serviciosService: ServiciosService) {
    this.cargarServicios();
  }

  mensaje(): string { return this.mensajeTexto; }
  esError(): boolean { return this.error; }

  cargarServicios(): void {
    this.serviciosService.obtenerTodos().subscribe({
      next: data => this.serviciosLista = data,
      error: () => { this.error = true; this.mensajeTexto = 'Error al cargar servicios'; }
    });
  }

  guardar(): void {
    if (this.servicio.id) {
      this.serviciosService.actualizar(this.servicio.id, this.servicio).subscribe({
        next: () => { this.mensajeTexto = 'Servicio actualizado'; this.error = false; this.cargarServicios(); this.cancelar(); },
        error: () => { this.error = true; this.mensajeTexto = 'Error al actualizar servicio'; }
      });
    } else {
      this.serviciosService.crear(this.servicio).subscribe({
        next: () => { this.mensajeTexto = 'Servicio registrado'; this.error = false; this.cargarServicios(); this.cancelar(); },
        error: () => { this.error = true; this.mensajeTexto = 'Error al registrar servicio'; }
      });
    }
  }

  editar(item: Servicio): void { this.servicio = { ...item }; }

  eliminar(item: Servicio): void {
    if (item.id) {
      this.serviciosService.eliminar(item.id).subscribe({
        next: () => { this.mensajeTexto = 'Servicio eliminado'; this.error = false; this.cargarServicios(); },
        error: () => { this.error = true; this.mensajeTexto = 'Error al eliminar servicio'; }
      });
    }
  }

  cancelar(): void {
    this.servicio = {
      id: undefined,
      nomServicio: '',
      precio: 0,
      descripcion: '',
      estadoRegistro: true
    };
  }

  servicios(): Servicio[] { return this.serviciosLista; }
}
