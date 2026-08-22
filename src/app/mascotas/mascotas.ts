import { Mascota } from "../core/models/models";
import { MascotasService } from "../core/services/mascotas.service";

export class Mascotas {
  mascotasLista: Mascota[] = [];
  mascota: Mascota = {
    id: undefined,
    animalId: 0,
    animalNombre: '',
    clienteId: 0,
    clienteNombre: '',
    nomMascota: '',
    fechaNacimiento: '',
    sexo: '',
    peso: 0,
    color: '',
    estadoRegistro: true
  };
  mensajeTexto: string = '';
  error: boolean = false;

  constructor(private mascotasService: MascotasService) {
    this.cargarMascotas();
  }

  mensaje(): string { return this.mensajeTexto; }
  esError(): boolean { return this.error; }

  cargarMascotas(): void {
    this.mascotasService.obtenerTodos().subscribe({
      next: data => this.mascotasLista = data,
      error: () => { this.error = true; this.mensajeTexto = 'Error al cargar mascotas'; }
    });
  }

  guardar(): void {
    if (this.mascota.id) {
      this.mascotasService.actualizar(this.mascota.id, this.mascota).subscribe({
        next: () => { this.mensajeTexto = 'Mascota actualizada'; this.error = false; this.cargarMascotas(); this.cancelar(); },
        error: () => { this.error = true; this.mensajeTexto = 'Error al actualizar mascota'; }
      });
    } else {
      this.mascotasService.crear(this.mascota).subscribe({
        next: () => { this.mensajeTexto = 'Mascota registrada'; this.error = false; this.cargarMascotas(); this.cancelar(); },
        error: () => { this.error = true; this.mensajeTexto = 'Error al registrar mascota'; }
      });
    }
  }

  editar(item: Mascota): void { this.mascota = { ...item }; }

  eliminar(item: Mascota): void {
    if (item.id) {
      this.mascotasService.eliminar(item.id).subscribe({
        next: () => { this.mensajeTexto = 'Mascota eliminada'; this.error = false; this.cargarMascotas(); },
        error: () => { this.error = true; this.mensajeTexto = 'Error al eliminar mascota'; }
      });
    }
  }

  cancelar(): void {
    this.mascota = {
      id: undefined,
      animalId: 0,
      animalNombre: '',
      clienteId: 0,
      clienteNombre: '',
      nomMascota: '',
      fechaNacimiento: '',
      sexo: '',
      peso: 0,
      color: '',
      estadoRegistro: true
    };
  }

  mascotas(): Mascota[] { return this.mascotasLista; }
}
