import { Component, inject, OnInit, signal } from '@angular/core';
import { Animal, Cliente, Mascota } from '../core/models/models';
import { MascotasService } from '../core/services/mascotas.service';
import { FormsModule } from '@angular/forms';
import { ClientesService } from '../core/services/clientes.service';
import { AnimalesService } from '../core/services/animales.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-mascotas',
  imports: [FormsModule, RouterLink],
  templateUrl: './mascotas.component.html',
  styleUrl: './mascotas.component.css',
})
export class MascotasComponent implements OnInit {
  private readonly mascotasService = inject(MascotasService);
  private readonly clienteService = inject(ClientesService);
  private readonly animaleService = inject(AnimalesService);

  mascotasLista = signal<Mascota[]>([]);
  clientesLista = signal<Cliente[]>([]);
  animalesLista = signal<Animal[]>([]);
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

  ngOnInit(): void {
    this.cargarMascotas();
    this.cargarClientes();
    this.cargarAnimales();
  }

  mensaje(): string { return this.mensajeTexto; }
  esError(): boolean { return this.error; }

  cargarAnimales() {
    this.animaleService.obtenerTodos().subscribe({
      next: data => { this.animalesLista.set(data), console.log(data) },
      error: () => { this.error = true; this.mensajeTexto = 'Error al cargar cleintes'; }
    })
  }

  cargarClientes() {
    this.clienteService.obtenerTodos().subscribe({
      next: data => { this.clientesLista.set(data), console.log(data) },
      error: () => { this.error = true; this.mensajeTexto = 'Error al cargar cleintes'; }
    })
  }

  cargarMascotas(): void {
    this.mascotasService.obtenerTodos().subscribe({
      next: data => this.mascotasLista.set(data),
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
}
