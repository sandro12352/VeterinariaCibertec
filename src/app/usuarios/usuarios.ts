import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../core/services/usuario.service';
import { Usuario, UsuariosResponse } from '../core/models/usuarios.response';



@Component({
  selector: 'app-usuarios',
  imports: [FormsModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios implements OnInit {

  private readonly usuarioService = inject(UsuarioService);
  loading = signal<boolean>(false);
  error = signal<string | null>('');

  busqueda = signal('');

  filtroRol = signal('');

  filtroEstado = signal('');

  mostrarModal = signal(false);

  usuarioEditando = signal<Usuario | null>(null);

  usuarios = signal<Usuario[]>([]);

  formUsuario = {
    nombre: '',
    correo: '',
    rolId: 0,
    password: '',
    estadoRegistro: true
  };

  ngOnInit(): void {
    this.obtenerUsuarios()
  }

  obtenerUsuarios(): void {

    this.loading.set(true);

    this.error.set(null);


    this.usuarioService.obtenerUsuarios().subscribe({

      next: (response: Usuario[]) => {
        this.usuarios.set(
          response
        );

        this.loading.set(false);
      },


      error: (err) => {

        console.error(
          'Error al obtener usuarios:',
          err
        );

        this.error.set(
          'No se pudieron cargar los usuarios.'
        );

        this.loading.set(false);
      }

    });
  }





  usuariosFiltrados = computed(() => {

    const texto = this.busqueda()
      .toLowerCase()
      .trim();

    const rol = this.filtroRol();

    const estado = this.filtroEstado();


    return this.usuarios().filter(usuario => {

      // -----------------------------------------
      // BÚSQUEDA
      // -----------------------------------------

      const coincideBusqueda =
        !texto ||
        usuario.nombre
          .toLowerCase()
          .includes(texto) ||
        (usuario.email ?? '')
          .toLowerCase()
          .includes(texto);


      // -----------------------------------------
      // ROL
      // -----------------------------------------

      const coincideRol =
        !rol ||
        usuario.rolNombre === rol;


      // -----------------------------------------
      // ESTADO
      // -----------------------------------------

      const coincideEstado =
        !estado ||
        (estado === 'ACTIVO' &&
          usuario.estadoRegistro) ||
        (estado === 'INACTIVO' &&
          !usuario.estadoRegistro);


      return (
        coincideBusqueda &&
        coincideRol &&
        coincideEstado
      );
    });
  });


  usuariosActivos = computed(() =>
    this.usuarios().filter(
      usuario => usuario.estadoRegistro
    ).length
  );



  usuariosInactivos = computed(() =>
    this.usuarios().filter(
      usuario => !usuario.estadoRegistro
    ).length
  );


  administradores = computed(() =>
    this.usuarios().filter(
      usuario =>
        usuario.rolNombre.toUpperCase() === 'ADMIN'
    ).length
  );




  abrirModalCrear(): void {

    this.usuarioEditando.set(null);

    this.formUsuario = {
      nombre: '',
      correo: '',
      rolId: 0,
      password: '',
      estadoRegistro: true
    };

    this.mostrarModal.set(true);
  }


  editarUsuario(usuario: Usuario): void {

    this.usuarioEditando.set(usuario);

    this.formUsuario = {
      nombre: usuario.nombre,
      correo: usuario.email,
      rolId: usuario.rolId,
      password: '',
      estadoRegistro: usuario.estadoRegistro
    };

    this.mostrarModal.set(true);
  }


  cerrarModal(): void {

    this.mostrarModal.set(false);

    this.usuarioEditando.set(null);
  }



  guardarUsuario(): void {

    if (
      !this.formUsuario.nombre ||
      !this.formUsuario.rolId ||
      !this.formUsuario.correo
    ) {
      return;
    }


    const usuarioActual = this.usuarioEditando();


    // =====================================================
    // EDITAR
    // =====================================================

    if (usuarioActual) {

      const usuariosActualizados = this.usuarios().map(usuario => {

        if (usuario.id !== usuarioActual.id) {
          return usuario;
        }

        return {
          ...usuario,
          nombre: this.formUsuario.nombre,
          email: this.formUsuario.correo,
          rolId: this.formUsuario.rolId,
          estadoRegistro: this.formUsuario.estadoRegistro
        };

      });


      this.usuarios.set(usuariosActualizados);

    }

    // =====================================================
    // CREAR
    // =====================================================

    else {

      const request = {
        nombre: this.formUsuario.nombre.trim(),
        password: this.formUsuario.password,
        email: this.formUsuario.correo.trim(),
        rolId: this.formUsuario.rolId
      };

      console.log(request);

      this.usuarioService
        .crearUsuario(request)
        .subscribe({

          next: (nuevoUsuario) => {

            console.log(
              'Usuario creado:',
              nuevoUsuario
            );

            this.usuarios.update(usuarios => [
              ...usuarios,
              nuevoUsuario
            ]);

            this.loading.set(false);
            this.cerrarModal();
          },

          error: (err) => {

            console.error(
              'Error al crear usuario:',
              err
            );

            this.error.set(
              err.error?.message ||
              'No se pudo crear el usuario.'
            );

            this.loading.set(false);
          }

        });
    }


  }


  cambiarEstado(usuario: Usuario): void {

    this.usuarios.update(
      usuarios =>
        usuarios.map(u =>
          u.id === usuario.id
            ? {
              ...u,
              estadoRegistro:
                !u.estadoRegistro
            }
            : u
        )
    );
  }


  eliminarUsuario(usuario: Usuario): void {

    const confirmar = confirm(
      `¿Deseas eliminar al usuario ${usuario.nombre}?`
    );


    if (!confirmar) {
      return;
    }


    this.usuarios.update(
      usuarios =>
        usuarios.filter(
          u => u.id !== usuario.id
        )
    );
  }


  obtenerIniciales(usuario: Usuario): string {

    return usuario.nombre
      .split(' ')
      .slice(0, 2)
      .map(nombre => nombre.charAt(0))
      .join('')
      .toUpperCase();
  }


  obtenerNombreRol(
    rol: string
  ): string {

    switch (rol.toUpperCase()) {

      case 'ADMIN':
      case 'ROLE_ADMIN':
        return 'Administrador';

      case 'VETERINARIO':
      case 'ROLE_VETERINARIO':
        return 'Veterinario';

      case 'RECEPCIONISTA':
      case 'ROLE_RECEPCIONISTA':
        return 'Recepcionista';

      default:
        return rol;
    }
  }

}
