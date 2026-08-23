import { Component, inject, OnInit, signal } from '@angular/core';
import { Animal } from '../core/models/models';
import { AnimalesService } from '../core/services/animales.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-animales',
  imports: [FormsModule],
  templateUrl: './animales.component.html',
  styleUrl: './animales.component.css',
})
export class AnimalesComponent implements OnInit {
  private animalesService = inject(AnimalesService);
  animalesLista = signal<Animal[]>([]);
  
  animal: Animal = { id: undefined, nomAnimal: '', raza: '', estadoRegistro: true };
  mensajeTexto: string = '';
  error: boolean = false;


  ngOnInit(): void {
    this.cargarAnimales();
  }

  

  mensaje(): string { return this.mensajeTexto; }
  esError(): boolean { return this.error; }

  cargarAnimales(): void {

    this.animalesService.obtenerTodos().subscribe({
      next: (data) => {
        console.log('ANIMALES RECIBIDOS:', data);

        this.animalesLista.set(data);

        console.log('LISTA:', this.animalesLista);
      },

      error: (err) => {
        console.error('ERROR AL CARGAR ANIMALES:', err);

        this.error = true;
        this.mensajeTexto = 'Error al cargar animales';
      }
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
}
