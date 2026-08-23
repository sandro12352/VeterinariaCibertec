import { Component, inject, OnInit, signal } from '@angular/core';
import { Atencion, HistorialClinico, PersonalMedico, Servicio } from '../core/models/models';
import { AtencionesService } from '../core/services/atencion.service';
import { FormsModule } from '@angular/forms';
import { PersonalMedicoService } from '../core/services/personal-medico.service';
import { ServiciosService } from '../core/services/servicios.service';
import { HistorialesService } from '../core/services/historiales-clinicos.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-atencion',
  imports: [FormsModule , DatePipe],
  templateUrl: './atencion.component.html',
  styleUrl: './atencion.component.css',
})
export class AtencionComponent implements OnInit {

  private readonly atencionesService = inject(AtencionesService);
  private readonly servicioService = inject(ServiciosService);
  private readonly personalMedicoService = inject(PersonalMedicoService);
  private readonly historialService = inject(HistorialesService);


  atenciones = signal<Atencion[]>([]);

  servicios = signal<Servicio[]>([]);

  personalMedico = signal<PersonalMedico[]>([]);

  historiales = signal<HistorialClinico[]>([]);

  mensajeTexto = signal<string>('');

  error = signal<boolean>(false);


  atencion: Atencion = this.atencionInicial();

  private atencionInicial(): Atencion {

    return {

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


  mensaje(): string {
    return this.mensajeTexto();
  }

  esError(): boolean {
    return this.error();
  }


  ngOnInit(): void {
    this.cargarAtenciones();

    this.cargarServicios();

    this.cargarPersonalMedico();

    this.cargarHistoriales();
  }


  cargarAtenciones(): void {

    this.atencionesService.obtenerTodos().subscribe({

      next: (data) => {
        this.atenciones.set(data);
      },

      error: () => {
        this.error.set(true);
        this.mensajeTexto.set('Error al cargar las atenciones');
      }

    });

  }

  cargarServicios(): void {

    this.servicioService.obtenerTodos().subscribe({

      next: (data) => {

        this.servicios.set(data);

      },

      error: () => {

        this.error.set(true);

        this.mensajeTexto.set(
          'Error al cargar los servicios'
        );

      }

    });

  }

  cargarPersonalMedico(): void {

    this.personalMedicoService.obtenerTodos().subscribe({

      next: (data) => {

        this.personalMedico.set(data);

      },

      error: () => {

        this.error.set(true);

        this.mensajeTexto.set(
          'Error al cargar el personal médico'
        );

      }

    });

  }


  cargarHistoriales(): void {

    this.historialService.obtenerTodos().subscribe({

      next: (data) => {

        this.historiales.set(data);

      },

      error: () => {

        this.error.set(true);

        this.mensajeTexto.set(
          'Error al cargar los historiales clínicos'
        );

      }

    });

  }


  guardar(): void {

    if (this.atencion.id) {

      this.atencionesService
        .actualizar(
          this.atencion.id,
          this.atencion
        )
        .subscribe({

          next: () => {

            this.mensajeTexto.set(
              'Atención actualizada correctamente'
            );

            this.error.set(false);

            this.cargarAtenciones();

            this.cancelar();

          },

          error: () => {

            this.error.set(true);

            this.mensajeTexto.set(
              'Error al actualizar la atención'
            );

          }

        });

    } else {

      this.atencionesService
        .crear(this.atencion)
        .subscribe({

          next: () => {

            this.mensajeTexto.set(
              'Atención registrada correctamente'
            );

            this.error.set(false);

            this.cargarAtenciones();

            this.cancelar();

          },

          error: () => {

            this.error.set(true);

            this.mensajeTexto.set(
              'Error al registrar la atención'
            );

          }

        });

    }

  }

  editar(item: Atencion): void {

    this.atencion = {
      ...item
    };

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  }

  eliminar(item: Atencion): void {

    if (!item.id) {
      return;
    }

    this.atencionesService
      .eliminar(item.id)
      .subscribe({

        next: () => {

          this.mensajeTexto.set(
            'Atención eliminada correctamente'
          );

          this.error.set(false);

          this.cargarAtenciones();

        },

        error: () => {

          this.error.set(true);

          this.mensajeTexto.set(
            'Error al eliminar la atención'
          );

        }

      });

  }

  cancelar(): void {

    this.atencion = this.atencionInicial();

  }
}
