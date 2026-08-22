import { Cliente } from "../core/models/models";
import { ClientesService } from "../core/services/clientes.service";

export class Clientes {
  clientesLista: Cliente[] = [];
  cliente: Cliente = {
    id: undefined,
    nombre: '',
    direccion: '',
    documentoIdentidad: '',
    telefono: '',
    email: '',
    estadoRegistro: true
  };
  mensajeTexto: string = '';
  error: boolean = false;

  constructor(private clientesService: ClientesService) {
    this.cargarClientes();
  }

  mensaje(): string { return this.mensajeTexto; }
  esError(): boolean { return this.error; }

  cargarClientes(): void {
    this.clientesService.obtenerTodos().subscribe({
      next: data => this.clientesLista = data,
      error: () => { this.error = true; this.mensajeTexto = 'Error al cargar clientes'; }
    });
  }

  guardar(): void {
    if (this.cliente.id) {
      this.clientesService.actualizar(this.cliente.id, this.cliente).subscribe({
        next: () => { this.mensajeTexto = 'Cliente actualizado'; this.error = false; this.cargarClientes(); this.cancelar(); },
        error: () => { this.error = true; this.mensajeTexto = 'Error al actualizar cliente'; }
      });
    } else {
      this.clientesService.crear(this.cliente).subscribe({
        next: () => { this.mensajeTexto = 'Cliente registrado'; this.error = false; this.cargarClientes(); this.cancelar(); },
        error: () => { this.error = true; this.mensajeTexto = 'Error al registrar cliente'; }
      });
    }
  }

  editar(item: Cliente): void { this.cliente = { ...item }; }

  eliminar(item: Cliente): void {
    if (item.id) {
      this.clientesService.eliminar(item.id).subscribe({
        next: () => { this.mensajeTexto = 'Cliente eliminado'; this.error = false; this.cargarClientes(); },
        error: () => { this.error = true; this.mensajeTexto = 'Error al eliminar cliente'; }
      });
    }
  }

  cancelar(): void {
    this.cliente = {
      id: undefined,
      nombre: '',
      direccion: '',
      documentoIdentidad: '',
      telefono: '',
      email: '',
      estadoRegistro: true
    };
  }

  clientes(): Cliente[] { return this.clientesLista; }
}
