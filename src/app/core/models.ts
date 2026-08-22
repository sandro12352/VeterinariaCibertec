// ============================
// ANIMAL
// ============================
export interface Animal {
  id?: number;
  nomAnimal: string;
  raza: string;
  estadoRegistro: boolean;
  fechaCreacion?: string;
  fechaModificacion?: string;
}

// ============================
// ATENCIÓN
// ============================
export interface Atencion {
  id?: number;
  servicioId: number;
  servicioNombre: string;
  personalMedicoId: number;
  personalMedicoNombre: string;
  historialId: number;
  mascotaId: number;
  mascotaNombre: string;
  clienteNombre: string;
  motivo: string;
  diagnostico: string;
  estado: string; // EstadoAtencion como string
  fechaAtencion: string;
  costoAtencion: number;
  estadoRegistro: boolean;
  fechaCreacion?: string;
  fechaModificacion?: string;
}


// ============================
// CLIENTE
// ============================
export interface Cliente {
  id?: number;
  nombre: string;
  direccion: string;
  documentoIdentidad: string;
  telefono: string;
  email: string;
  estadoRegistro: boolean;
  fechaCreacion?: string;
  fechaModificacion?: string;
}


// ============================
// HISTORIAL CLÍNICO
// ============================
export interface HistorialClinico {
  id?: number;
  mascotaId: number;
  mascotaNombre: string;
  clienteNombre: string;
  observaciones: string;
  fechaApertura: string;
  estadoRegistro: boolean;
  fechaCreacion?: string;
  fechaModificacion?: string;
}


// ============================
// MASCOTA
// ============================
export interface Mascota {
  id?: number;
  animalId: number;
  animalNombre: string;
  clienteId: number;
  clienteNombre: string;
  nomMascota: string;
  fechaNacimiento: string;
  sexo: string;
  peso: number;
  color: string;
  estadoRegistro: boolean;
  fechaCreacion?: string;
  fechaModificacion?: string;
}


// ============================
// PERSONAL MÉDICO
// ============================
export interface PersonalMedico {
  id?: number;
  usuarioId: number;
  usuarioNombre: string;
  email: string;
  especialidad: string;
  numColegiatura: string;
  estadoRegistro: boolean;
  fechaCreacion?: string;
  fechaModificacion?: string;
}


// ============================
// SERVICIO
// ============================
export interface Servicio {
  id?: number;
  nomServicio: string;
  precio: number;
  descripcion: string;
  estadoRegistro: boolean;
  fechaCreacion?: string;
  fechaModificacion?: string;
}
