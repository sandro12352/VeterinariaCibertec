import { AnimalesService } from '../core/animales.service';
import { Animal } from '../core/models';

export class Animales {
  animalesLista: Animal[] = [];
  animal: Animal = { id: undefined, nomAnimal: '', raza: '', estadoRegistro: true };
  mensajeTexto: string = '';
  error: boolean = false;

  constructor(private animalesService: AnimalesService) {
    this.cargarAnimales();
  }

  mensaje(): string { return this.mensajeTexto; }
  esError(): boolean { return this.error; }

  cargarAnimales(): void {
    this.animalesService.obtenerTodos().subscribe({
      next: data => this.animalesLista = data,
      error: () => { this.error = true; this.mensajeTexto = 'Error al cargar animales'; }
    });
  }

  guardar(): void {
    if (this.animal.id) {
      this.animalesService.actualizar(this.animal.id, this.animal).subscribe({
        next: () => { this.mensajeTexto = 'Animal actualizado'; this.error = false; this.cargarAnimales(); this.cancelar(); },
        error: () => { this.error = true; this.mensajeTexto = 'Error al actualizar animal'; }
      });
    } else {
      this.animalesService.crear(this.animal).subscribe({
        next: () => { this.mensajeTexto = 'Animal registrado'; this.error = false; this.cargarAnimales(); this.cancelar(); },
        error: () => { this.error = true; this.mensajeTexto = 'Error al registrar animal'; }
      });
    }
  }

  editar(item: Animal): void { this.animal = { ...item }; }

  eliminar(item: Animal): void {
    if (item.id) {
      this.animalesService.eliminar(item.id).subscribe({
        next: () => { this.mensajeTexto = 'Animal eliminado'; this.error = false; this.cargarAnimales(); },
        error: () => { this.error = true; this.mensajeTexto = 'Error al eliminar animal'; }
      });
    }
  }

  cancelar(): void {
    this.animal = { id: undefined, nomAnimal: '', raza: '', estadoRegistro: true };
  }

  animales(): Animal[] { return this.animalesLista; }
}
