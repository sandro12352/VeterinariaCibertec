export interface UsuariosResponse {
    usuarios:Usuario[],
}



export interface Usuario {
    id: number;
    rolId: number;
    rolNombre: string;
    nombre: string;
    email: string;
    telefono: null;
    estadoRegistro: boolean;
    fechaCreacion: Date;
    fechaModificacion: null;
}