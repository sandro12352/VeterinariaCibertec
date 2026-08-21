export interface Atencion {
  id?: number
  motivo: string
  estado: string
  fecha: string
  mascotaId: number
  personalMedicoId: number
  activo?: boolean
}

export interface PersonalMedico {
  usuarioId: number;
  numeroColegiatura: string;
  especialidad: string;
  rolNombre: string;
  personaNombre: string;
}
